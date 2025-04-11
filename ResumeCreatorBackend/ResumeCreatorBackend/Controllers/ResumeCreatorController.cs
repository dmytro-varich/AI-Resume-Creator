using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Models;
using ResumeCreatorBackend.Services;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Diagnostics;
using System.IO;
using System.Text.RegularExpressions;
using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;


namespace ResumeCreatorBackend.Controllers
{
    public class UserInputTemp
    {
        //public string LinkerdInLink { get; set; }
        public string GitHubLink { get; set; }
        public string? UserPrompt { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class ResumeCreatorController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ParserService _parserService;
        private readonly AICommunicationService _aiCommunicationService;
        private readonly IWebHostEnvironment _env;

        public ResumeCreatorController(IHttpClientFactory httpClientFactory, ParserService parserService, AICommunicationService aiCommunicationService, IWebHostEnvironment env)
        {
            _httpClientFactory = httpClientFactory;
            _parserService = parserService;
            _aiCommunicationService = aiCommunicationService;
            _env = env;
        }

        [HttpPost("CreateTestResume")]
        public async Task<IActionResult> CreateTest(string resultContent)
        {
            //string pattern = @"```latex\s*(.*?)\s*```";
            string pattern = @"(?<=```latex\s)(.*?)(?=\s```)";
            var match = Regex.Match(resultContent, pattern, RegexOptions.Singleline);
            if (!match.Success)
            {
                return StatusCode(503, "No Latex code found in AI response.");
            }

            
            // Extract the LaTeX code from the first capturing group.
            string latexCode = match.Groups[1].Value;
            latexCode = latexCode.Replace("%", "");
            //Console.WriteLine("Extracted LaTeX code:");
            Console.WriteLine(latexCode);

            // Step 2: Write the extracted LaTeX code to a .tex file.
            string texFilePath = "resume.tex";
            System.IO.File.WriteAllText(texFilePath, latexCode);
            Console.WriteLine($"LaTeX code written to {texFilePath}");

            // Step 3: Use pdflatex to compile the .tex file into a PDF.
            // Ensure that 'pdflatex' is installed and available in the system PATH.
            ProcessStartInfo processInfo = new ProcessStartInfo
            {
                FileName = "pdflatex",
                Arguments = $"-interaction=nonstopmode {texFilePath}",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            try
            {
                using (Process process = Process.Start(processInfo))
                {
                    // Output for debugging
                    string output = process.StandardOutput.ReadToEnd();
                    string errorOutput = process.StandardError.ReadToEnd();
                    process.WaitForExit();

                    if (process.ExitCode == 0)
                    {
                        Console.WriteLine("PDF successfully generated.");
                        // Pdflatex outputs a PDF with the same base name as the tex file, e.g. "resume.pdf"
                    }
                    else
                    {
                        Console.WriteLine($"Error during PDF generation. Exit code: {process.ExitCode}");
                        Console.WriteLine("Error output:");
                        Console.WriteLine(output);
                        Console.WriteLine(errorOutput);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception while running pdflatex: " + ex.Message);
            }

            //// Delete Latex file after usage
            //if (System.IO.File.Exists(texFilePath))
            //{
            //    try
            //    {
            //        System.IO.File.Delete(texFilePath);
            //        Console.WriteLine($"Deleted LaTeX file: {texFilePath}");
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine($"Could not delete LaTeX file: {ex.Message}");
            //    }
            //}

            // Adjust the path as needed
            string filePath = Path.Combine(_env.ContentRootPath, "resume.pdf");
            if (!System.IO.File.Exists(filePath))
                return NotFound("Resume pdf was not created correctly.");

            byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

            // Set the Content-Disposition header for inline display
            //Response.Headers.Add("Content-Disposition", "inline; filename=resume.pdf");

            return File(fileBytes, "application/pdf", "resume.pdf");
        }

        [HttpPost("CreateResumeFromResources")]
        public async Task<IActionResult> CreateResumeAsync([FromBody] UserInputTemp userInputTemp)
        {
            if (userInputTemp == null)
            {
                return BadRequest("Action requires 2 given links.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create http client
            var client = _httpClientFactory.CreateClient();
            client.Timeout = TimeSpan.FromMinutes(10);

            Dictionary<string, object> resourcesLinks = new Dictionary<string, object>
            {
                {"GitHub", userInputTemp.GitHubLink}
            };

            // Get data from the parser  
            HttpResponseMessage response = await client.PostAsJsonAsync("http://parser:5000/user", resourcesLinks);
            response.EnsureSuccessStatusCode();

            Dictionary<string, object> resultObjects = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();

            if (resultObjects == null) {
                return StatusCode(503, "Parser service answered with no data");
            }

            // Create prompt from extracted data
            string dataPrompt = _aiCommunicationService.CreateDataPrompt(resultObjects);

            string promptForSending = dataPrompt + " " + userInputTemp.UserPrompt;

            // Get the AI API response for the given request message
            HttpResponseMessage aiAPIresponse = await _aiCommunicationService.SendRequestAsync(client, promptForSending, modelName: "deepseek-r1:latest");

            if (aiAPIresponse.IsSuccessStatusCode)
            {
                var resultContent = await aiAPIresponse.Content.ReadAsStringAsync();

                string pattern = @"(?<=```latex\s)(.*?)(?=\s```)";
                var match = Regex.Match(resultContent, pattern, RegexOptions.Singleline);
                if (!match.Success)
                {
                    return StatusCode(503, "No Latex code found in AI response.");
                }
                // Extract the LaTeX code from the first capturing group.
                string latexCode = match.Groups[1].Value;
                latexCode = latexCode.Replace("%", "");
                latexCode = latexCode.Replace("\\usepackage{margin}", "");
                //Console.WriteLine("Extracted LaTeX code:");
                Console.WriteLine(latexCode);

                // Step 2: Write the extracted LaTeX code to a .tex file.
                string texFilePath = "resume.tex";
                System.IO.File.WriteAllText(texFilePath, latexCode);
                Console.WriteLine($"LaTeX code written to {texFilePath}");

                // Step 3: Use pdflatex to compile the .tex file into a PDF.
                // Ensure that 'pdflatex' is installed and available in the system PATH.
                ProcessStartInfo processInfo = new ProcessStartInfo
                {
                    FileName = "pdflatex",
                    Arguments = $"-interaction=nonstopmode {texFilePath}",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                try
                {
                    using (Process process = Process.Start(processInfo))
                    {
                        // Output for debugging
                        string output = process.StandardOutput.ReadToEnd();
                        string errorOutput = process.StandardError.ReadToEnd();
                        process.WaitForExit();

                        if (process.ExitCode == 0)
                        {
                            Console.WriteLine("PDF successfully generated.");
                            // Pdflatex outputs a PDF with the same base name as the tex file, e.g. "resume.pdf"
                        }
                        else
                        {
                            Console.WriteLine($"Error during PDF generation. Exit code: {process.ExitCode}");
                            Console.WriteLine("Error output:");
                            Console.WriteLine(errorOutput);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Exception while running pdflatex: " + ex.Message);
                }

                //// Delete Latex file after usage
                if (System.IO.File.Exists(texFilePath))
                {
                    try
                    {
                        System.IO.File.Delete(texFilePath);
                        Console.WriteLine($"Deleted LaTeX file: {texFilePath}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Could not delete LaTeX file: {ex.Message}");
                    }
                }

                // Adjust the path as needed
                string filePath = Path.Combine(_env.ContentRootPath, "resume.pdf");
                if (!System.IO.File.Exists(filePath))
                    return NotFound("Resume pdf was not created correctly.");

                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

                // Set the Content-Disposition header for inline display
                //Response.Headers.Add("Content-Disposition", "inline; filename=resume.pdf");

                //return Ok(resultContent);
                return File(fileBytes, "application/pdf", "resume.pdf");
            }
            else
            {
                return StatusCode((int)aiAPIresponse.StatusCode, $"API answered with {await aiAPIresponse.Content.ReadAsStringAsync()}");
            }
        }
    }
}
