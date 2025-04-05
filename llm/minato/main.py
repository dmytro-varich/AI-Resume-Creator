from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
from pathlib import Path
from starlette.responses import StreamingResponse
import asyncio
from pydantic import BaseModel, Field
from ollama import ListResponse, list, pull
import time
from typing import List
import ollama


app = FastAPI(
    title="Minato API",
    description="Simple RESTful interface that possible usage ollama on coca.",
    version="0.1.0",
    contact={
        "name": "Sidjik",
        "email": "arsenii.milenchuk@student.tuke.sk",
    },
)



UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)  








async def delete_file_later(file_path, delay = 120):
    await asyncio.sleep(delay)
    if file_path.exists():
        file_path.unlink()






@app.get("/{model_name}",
         response_description="Succesfully generated answer",
         tags=['Minato', 'Synchronous'])
async def answer_on_query(model_name: str, message: str, 
                          system_prompt: str =None, keep_alive:int = 1, 
                          numa: bool = True, num_ctx: int = 4096, num_keep: int = 4096,
                          num_batch: int = 1, low_vram: bool = False, 
                          seed: int = 21, temperature: int = 0):
    """
    A request that makes a synchronous request and generates a response to the message. 

    - **message**: message query
    - **keep_alive**: the time that the model will be on the graphics card, for subsequent quick response
    - **numa**: enables or disables NUMA (Non-Uniform Memory Access) to optimize memory management on multiprocessor systems
    - **num_ctx**: sets the size of the context window for generating the next token (the size of the history the model works with)
    - **num_keep**: specifies the number of tokens to preserve when generating text (e.g. to preserve a certain part of the context) 
    - **num_batch**: batch size (number of examples processed simultaneously) during training or generation
    - **low_vram**: enables a low-VRAM mode, optimizing performance on systems with limited VRAM.
    - **seed**: sets the seed for random number generation. Allows predictions to be consistent
    - **temperature**: controls the creativity of the model. High values make the responses more varied, low values make them more predictable. Can be from 0 to 1.
    """
    
    options = {
        "numa": numa, 
        "num_ctx": num_ctx, 
        "num_keep": num_keep, 
        "num_batch": num_batch, 
        "low_vram": low_vram, 
        "seed": seed, 
        "temperature": temperature
    }    
    message = [{'role': 'user', 'content': message}]
    if system_prompt is not None: 
        message.insert(0, {'role': 'system', 'content': system_prompt})
    try:
        response = ollama.chat(
            model=model_name,
            messages = message,
            tools=None,
            options=options,
            keep_alive=keep_alive, 
        )['message']['content']
    except Exception as e:
        raise HTTPException(status_code=404, detail="While hundle your response, we have error: {}".format(e))

    return {'response': response.strip()}





async def stream_response(response): 
    for i in response: 
        yield i['message']['content']
        await asyncio.sleep(0.1)







@app.get('/stream/{model_name}',
         tags=['Minato', 'Asynchronous'])
async def async_answer_on_query(model_name:str, message: str, 
                            system_prompt: str =None, keep_alive:int = 1,
                            numa: bool = True, num_ctx: int = 4096, num_keep: int = 4096,
                            num_batch: int = 1, low_vram: bool = False, 
                            seed: int = 21, temperature: int = 0):

    """
    A request that makes a asynchronous request and generates a response to the message. 

    - **message**: message query
    - **keep_alive**: the time that the model will be on the graphics card, for subsequent quick response
    - **numa**: enables or disables NUMA (Non-Uniform Memory Access) to optimize memory management on multiprocessor systems
    - **num_ctx**: sets the size of the context window for generating the next token (the size of the history the model works with)
    - **num_keep**: specifies the number of tokens to preserve when generating text (e.g. to preserve a certain part of the context) 
    - **num_batch**: batch size (number of examples processed simultaneously) during training or generation
    - **low_vram**: enables a low-VRAM mode, optimizing performance on systems with limited VRAM.
    - **seed**: sets the seed for random number generation. Allows predictions to be consistent
    - **temperature**: controls the creativity of the model. High values make the responses more varied, low values make them more predictable. Can be from 0 to 1.

    """
    options = {
        "numa": numa, 
        "num_ctx": num_ctx, 
        "num_keep": num_keep, 
        "num_batch": num_batch, 
        "low_vram": low_vram, 
        "seed": seed, 
        "temperature": temperature
    }    
    
    message = [{'role': 'user', 'content': message}]
    if system_prompt is not None: 
        message.insert(0, {'role': 'system', 'content': system_prompt})   
    try:
        response = ollama.chat(
            model=model_name,
            messages = message,
            tools=None,
            options=options,
            keep_alive=keep_alive,
            stream=True
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail="While hundle your response, we have error: {}".format(e))


    return StreamingResponse(stream_response(response), media_type="text/plain")
   








@app.post("/vision/{model_name}",
          tags=['Minato', 'Synchronous', 'Multimodal'])
def answer_on_multimodal_query(model_name: str, message: str, images: List[UploadFile], 
                            system_prompt: str =None, keep_alive:int=1,
                            numa: bool = True, num_ctx: int = 4096, num_keep: int = 4096,
                            num_batch: int = 1, low_vram: bool = False, 
                            seed: int = 21, temperature: int = 0):
    """
    A query that allows the use of multimodal models together with images and text message.

    **model_name**: define model name that you want to use
    **message**: text message to model
    **images**: array with images, that will get to input
    - **numa**: enables or disables NUMA (Non-Uniform Memory Access) to optimize memory management on multiprocessor systems
    - **num_ctx**: sets the size of the context window for generating the next token (the size of the history the model works with)
    - **num_keep**: specifies the number of tokens to preserve when generating text (e.g. to preserve a certain part of the context) 
    - **num_batch**: batch size (number of examples processed simultaneously) during training or generation
    - **low_vram**: enables a low-VRAM mode, optimizing performance on systems with limited VRAM.
    - **seed**: sets the seed for random number generation. Allows predictions to be consistent
    - **temperature**: controls the creativity of the model. High values make the responses more varied, low values make them more predictable. Can be from 0 to 1.

    """
    options = {
        "numa": numa, 
        "num_ctx": num_ctx, 
        "num_keep": num_keep, 
        "num_batch": num_batch, 
        "low_vram": low_vram, 
        "seed": seed, 
        "temperature": temperature
    }    

    # add checking that model support multimodal input
    vision_model = ['llava', 'moondream', 'llama3.2-vision', 
                'llava-llama3', 'bakllava', 'minicpm-v']
    for idx, model in enumerate(vision_model): 
        if model in model_name: 
            break

        if idx+1 == len(vision_model): 
            raise HTTPException(status_code=404, detail="Model does not support multimodal answerning!")

    # save image to system 
    files_path = []
    for image in images: 
        path = UPLOAD_DIR / '_'.join([str(int(time.time())), image.filename])
        with path.open('wb') as buffer: 
            shutil.copyfileobj(image.file, buffer)
        files_path.append(path)

    message = [{'role': 'user', 'content': message, 'images': files_path}]
    if system_prompt is not None: 
        message.insert(0, {'role': 'system', 'content': system_prompt}) 
    # get model response
    try:
        response = ollama.chat(
            model=model_name,
            messages = message,
            tools=None,
            options=options,
            keep_alive=keep_alive, 
        )['message']['content']
    except Exception as e:
        raise HTTPException(status_code=404, detail="While hundle your response, we have error: {}".format(e))
    
    # delete image from uploads dir
    for img_path in files_path: img_path.unlink()
    return {'response' : response}









@app.post("/stream/vision/{model_name}",
          tags=['Minato', 'Asynchronous', 'Multimodal'])
async def async_answer_on_multimodal_query(model_name: str, message: str, images: List[UploadFile], 
                            system_prompt: str =None,keep_alive: int = 1, 
                            numa: bool = True, num_ctx: int = 4096, num_keep: int = 4096,
                            num_batch: int = 1, low_vram: bool = False, 
                            seed: int = 21, temperature: int = 0):

    """
    A query that allows the use of multimodal models together with images and text message.
    The function produces an asynchronous response.

    **model_name**: define model name that you want to use
    **message**: text message to model
    **images**: array with images, that will get to input
    - **numa**: enables or disables NUMA (Non-Uniform Memory Access) to optimize memory management on multiprocessor systems
    - **num_ctx**: sets the size of the context window for generating the next token (the size of the history the model works with)
    - **num_keep**: specifies the number of tokens to preserve when generating text (e.g. to preserve a certain part of the context) 
    - **num_batch**: batch size (number of examples processed simultaneously) during training or generation
    - **low_vram**: enables a low-VRAM mode, optimizing performance on systems with limited VRAM.
    - **seed**: sets the seed for random number generation. Allows predictions to be consistent
    - **temperature**: controls the creativity of the model. High values make the responses more varied, low values make them more predictable. Can be from 0 to 1.

    """
    options = {
        "numa": numa, 
        "num_ctx": num_ctx, 
        "num_keep": num_keep, 
        "num_batch": num_batch, 
        "low_vram": low_vram, 
        "seed": seed, 
        "temperature": temperature
    }    

    # add checking that model support multimodal input
    vision_model = ['llava', 'moondream', 'llama3.2-vision', 
                'llava-llama3', 'bakllava', 'minicpm-v']
    for idx, model in enumerate(vision_model): 
        if model in model_name: 
            break

        if idx+1 == len(vision_model): 
            raise HTTPException(status_code=404, detail="Model does not support multimodal answerning!")

    # save image to system 
    files_path = []
    for image in images: 
        path = UPLOAD_DIR / '_'.join([str(int(time.time())), image.filename])
        with path.open('wb') as buffer: 
            shutil.copyfileobj(image.file, buffer)
        files_path.append(path)



    message = [{'role': 'user', 'content': message, 'images': files_path}]
    if system_prompt is not None: 
        message.insert(0, {'role': 'system', 'content': system_prompt}) 
    # get model response
    try:
        response = ollama.chat(
            model=model_name,
            messages = message,
            tools=None,
            options=options,
            keep_alive=keep_alive,
            stream = True,
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail="While hundle your response, we have error: {}".format(e))
    # after 120 seconds we are cleaning our image path
    asyncio.create_task(delete_file_later(files_path))
    
    # get model answer on streaming style
    return StreamingResponse(stream_response(response), 
                             media_type="text/plain")














@app.post('/install/{model_name}',
          tags=['Minato', 'Settings'])
def download_model(model_name: str): 
    """
    Allows you download model to the server. You can use model name that you find on ollama mirror website
    
    **model_name**: define model name that will download from ollama mirror
    
    Simply return status of downlod.
    """
    return {'status' : pull(model_name, stream=False).status}










# get list available models 
@app.get('/models_list/',
         tags=['Minato', 'Settings'])
def get_list_available_models():
    """
    Return list with info about available models, such as
    
    - **Name**
    - **Size in MB**
    - **Format** if available for model
    - **Family** if available for model
    - **Size of parameters** if available for model
    - **Quantization level** if available for model

    """

    response: ListResponse = list()
    result = []
    for model in response.models:
        model_info = dict()
        model_info['name'] = model.model
        model_info['size'] = f'Size (MB): {(model.size.real / 1024 / 1024):.2f}'
        if model.details:
            model_info['details'] = True
            model_info['foramt'] = model.details.format
            model_info['family'] = model.details.family
            model_info['parameter_size'] = model.details.parameter_size
            model_info['quantization_level'] = model.details.quantization_level
        else: 
            model_info['details'] = False
        result.append(model_info)
    return {"models_list": result}

