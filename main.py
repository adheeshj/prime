from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
import json
from prime_utils import small_prime_check, miller_rabin_stream
import sys
from q1 import solve_q1_stream
from q2 import solve_q2_stream
from q3 import solve_q3_stream
from q4 import solve_q4_stream
from q5 import solve_q5_stream
from q6 import solve_q6_stream
from q7 import solve_q7_stream



app = FastAPI()
sys.set_int_max_str_digits(0)
# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Streaming prime tester
@app.get("/api/testprime/stream")
def test_prime_stream(n: str):
    def generate():
        try:
            num = int(n)
        except ValueError:
            yield f"data: {json.dumps({'error': 'Invalid number'})}\n\n"
            return

        yield f"data: {json.dumps({'status': 'starting', 'number': num})}\n\n"

        # First check small primes
        small_result = small_prime_check(num)
        if small_result is not None:
            yield f"data: {json.dumps({'type': 'small_prime_check', 'result': small_result})}\n\n"
            if small_result:
                yield f"data: {json.dumps({'status': 'complete', 'prime': True, 'reason': 'small prime'})}\n\n"
            else:
                yield f"data: {json.dumps({'status': 'complete', 'prime': False, 'reason': 'divisible by small prime'})}\n\n"
            return

        yield f"data: {json.dumps({'type': 'info', 'message': 'Starting Miller-Rabin test...'})}\n\n"

        # Miller-Rabin with streaming
        for log_entry in miller_rabin_stream(num, rounds=6):
            yield f"data: {json.dumps(log_entry)}\n\n"

    return StreamingResponse(generate(), media_type="text/plain")

# Regular prime tester (non-streaming)
@app.get("/api/testprime")
def test_prime(n: str):
    try:
        num = int(n)
    except ValueError:
        return {"error": "Invalid number"}

    # First check small primes
    small_result = small_prime_check(num)
    if small_result is not None:
        return {"prime": small_result}

    # Then fall back to Miller-Rabin
    return {"prime": miller_rabin_stream(num, 6, stream_mode=False)}

# Question 1 streaming
@app.get("/api/question1/stream")
def question1_stream():
    def generate():
        for log_entry in solve_q1_stream():
            yield f"data: {json.dumps(log_entry)}\n\n"

    return StreamingResponse(generate(), media_type="text/plain")

# Question 2 streaming
@app.get("/api/question2/stream")
def question2_stream():
    def generate():
        for log_entry in solve_q2_stream():
            yield f"data: {json.dumps(log_entry)}\n\n"

    return StreamingResponse(generate(), media_type="text/plain")

# Question 3 streaming
@app.get("/api/question3/stream")
def question3_stream():
    def generate():
        for log_entry in solve_q3_stream():
            yield f"data: {json.dumps(log_entry)}\n\n"

    return StreamingResponse(generate(), media_type="text/plain")
@app.get("/api/question4/stream")
def question4_stream():
    def generate():
        for log_entry in solve_q4_stream():
            yield f"data: {json.dumps(log_entry)}\n\n"
    return StreamingResponse(generate(), media_type="text/plain")
@app.get("/api/question5/stream")
def question5_stream():
    def generate():
        for log_entry in solve_q5_stream():
            yield f"data: {json.dumps(log_entry)}\n\n"
    return StreamingResponse(generate(), media_type="text/plain")
@app.get("/api/question6/stream")
def question6_stream():
    def generate():
        for log_entry in solve_q6_stream():
            yield f"data: {json.dumps(log_entry)}\n\n"
    return StreamingResponse(generate(), media_type="text/plain")
@app.get("/api/question7/stream")
def question7_stream(E: str, start: str = None, attempts: str = None):
    def generate():
        # Parse inputs
        try:
            E_val = int(E)
        except Exception:
            yield f"data: {json.dumps({'type': 'error', 'message': 'Invalid E (must be integer)'})}\n\n"
            yield f"data: {json.dumps({'type': 'complete', 'message': 'Q7 aborted (invalid E)'})}\n\n"
            return

        start_hint = None
        if start is not None:
            try:
                start_hint = int(start)
            except Exception:
                start_hint = None

        max_attempts = 20000
        if attempts is not None:
            try:
                max_attempts = int(attempts)
            except Exception:
                pass

        for log_entry in solve_q7_stream(E_val, max_attempts=max_attempts, start_hint=start_hint):
            yield f"data: {json.dumps(log_entry)}\n\n"
    return StreamingResponse(generate(), media_type="text/plain")



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)