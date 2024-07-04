from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel

from unit_test.generate_tests import load_documents_unit_test_to_vectordb, \
    generate_tests_unit_test_to_vectordb
from synthetic_data.generate_data import load_documents_synthetic_data_to_vectordb, \
    generate_data_synthetic_data_to_vectordb


class ClientQueryRequest(BaseModel):
    query: str


app = FastAPI(middleware=[
    Middleware(CORSMiddleware, allow_origins=["*"],
               allow_methods=["*"],
               allow_headers=["*"])
])


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/unit-test/load-documents")
async def unit_test_load_documents(files: list[UploadFile]):
    res = await load_documents_unit_test_to_vectordb(files)
    return {
        "status": "success",
        "response": res
    }


@app.post("/unit-test/generate-tests")
async def unit_test_generate_tests(files: list[UploadFile]):
    content_response = await generate_tests_unit_test_to_vectordb(files)
    # Do shit
    return {
        "content": content_response
    }


@app.post("/synthetic-data/generate")
def generate_unit_test():
    # Do shit
    return {
        "content": str
    }


@app.post("/synthetic-data/load-data-description")
async def synthetic_data_load_documents(files: list[UploadFile]):
    res = await load_documents_synthetic_data_to_vectordb(files)
    return {
        "status": "success",
        "response": res
    }


@app.post("/synthetic-data/load-data-distribution")
async def synthetic_data_load_documents(files: list[UploadFile]):
    res = await load_documents_synthetic_data_to_vectordb(files)
    return {
        "status": "success",
        "response": res
    }


@app.post("/synthetic-data/get-client-query")
async def synthetic_data_generate_data(client_query: ClientQueryRequest):
    query_str = client_query.query
    content_response = await generate_data_synthetic_data_to_vectordb(query_str)
    print(content_response)
    return {
        "content": content_response
    }

