# Minato API

Simple RESTful interface that possible usage ollama on coca.

# Base URL


| URL | Description |
|-----|-------------|


# APIs

## GET /{model_name}

Answer On Query

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


### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| model_name | string | True |  |
| message | string | True |  |
| system_prompt | string | False |  |
| keep_alive | integer | False |  |
| numa | boolean | False |  |
| num_ctx | integer | False |  |
| num_keep | integer | False |  |
| num_batch | integer | False |  |
| low_vram | boolean | False |  |
| seed | integer | False |  |
| temperature | integer | False |  |


### Responses

#### 200


Succesfully generated answer








#### 422


Validation Error


[HTTPValidationError](#httpvalidationerror)







## GET /stream/{model_name}

Async Answer On Query

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


### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| model_name | string | True |  |
| message | string | True |  |
| system_prompt | string | False |  |
| keep_alive | integer | False |  |
| numa | boolean | False |  |
| num_ctx | integer | False |  |
| num_keep | integer | False |  |
| num_batch | integer | False |  |
| low_vram | boolean | False |  |
| seed | integer | False |  |
| temperature | integer | False |  |


### Responses

#### 200


Successful Response








#### 422


Validation Error


[HTTPValidationError](#httpvalidationerror)







## POST /vision/{model_name}

Answer On Multimodal Query

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


### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| model_name | string | True |  |
| message | string | True |  |
| system_prompt | string | False |  |
| keep_alive | integer | False |  |
| numa | boolean | False |  |
| num_ctx | integer | False |  |
| num_keep | integer | False |  |
| num_batch | integer | False |  |
| low_vram | boolean | False |  |
| seed | integer | False |  |
| temperature | integer | False |  |


### Request Body

[Body_answer_on_multimodal_query_vision__model_name__post](#body_answer_on_multimodal_query_vision__model_name__post)







### Responses

#### 200


Successful Response








#### 422


Validation Error


[HTTPValidationError](#httpvalidationerror)







## POST /stream/vision/{model_name}

Async Answer On Multimodal Query

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


### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| model_name | string | True |  |
| message | string | True |  |
| system_prompt | string | False |  |
| keep_alive | integer | False |  |
| numa | boolean | False |  |
| num_ctx | integer | False |  |
| num_keep | integer | False |  |
| num_batch | integer | False |  |
| low_vram | boolean | False |  |
| seed | integer | False |  |
| temperature | integer | False |  |


### Request Body

[Body_async_answer_on_multimodal_query_stream_vision__model_name__post](#body_async_answer_on_multimodal_query_stream_vision__model_name__post)







### Responses

#### 200


Successful Response








#### 422


Validation Error


[HTTPValidationError](#httpvalidationerror)







## POST /install/{model_name}

Download Model

Allows you download model to the server. You can use model name that you find on ollama mirror website

**model_name**: define model name that will download from ollama mirror

Simply return status of downlod.


### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| model_name | string | True |  |


### Responses

#### 200


Successful Response








#### 422


Validation Error


[HTTPValidationError](#httpvalidationerror)







## GET /models_list/

Get List Available Models

Return list with info about available models, such as

- **Name**
- **Size in MB**
- **Format** if available for model
- **Family** if available for model
- **Size of parameters** if available for model
- **Quantization level** if available for model




### Responses

#### 200


Successful Response








# Components



## Body_answer_on_multimodal_query_vision__model_name__post



| Field | Type | Description |
|-------|------|-------------|
| images | array |  |


## Body_async_answer_on_multimodal_query_stream_vision__model_name__post



| Field | Type | Description |
|-------|------|-------------|
| images | array |  |


## HTTPValidationError



| Field | Type | Description |
|-------|------|-------------|
| detail | array |  |


## ValidationError



| Field | Type | Description |
|-------|------|-------------|
| loc | array |  |
| msg | string |  |
| type | string |  |
