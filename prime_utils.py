import random

def decompose(n):
    k = 0
    d = n - 1
    while d % 2 == 0:
        d //= 2
        k += 1
    return k, d

def small_prime_check(n: int) -> bool | None:
    if n < 2:
        return False
    
    small_primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,
                    53,59,61,67,71,73,79,83,89,97,101,103,107]
    
    for p in small_primes:
        if n % p == 0:
            return n == p
    return None

def miller_rabin_stream(n, rounds=6, stream_mode=True):
    """Miller-Rabin primality test with optional streaming"""
    
    if n < 2:
        if stream_mode:
            yield {"type": "result", "prime": False, "reason": "number less than 2"}
            return
        return False

    if n % 2 == 0:
        if stream_mode:
            yield {"type": "result", "prime": n == 2, "reason": "even number"}
            return
        return n == 2

    k, d = decompose(n)
    
    if stream_mode:
        yield {"type": "info", "message": f"n-1 = 2^{k} * {d}"}

    for round_num in range(rounds):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)
        
        # Format large numbers for display
        def format_large_num(num):
            s = str(num)
            if len(s) <= 50:
                return s
            else:
                return f"{s[:20]}...{s[-20:]} ({len(s)} digits)"
        
        if stream_mode:
            yield {"type": "test", "round": round_num + 1, "base": a, "initial_value": format_large_num(x)}

        if x == 1 or x == n - 1:
            if stream_mode:
                witness_type = "1" if x == 1 else "n-1"
                yield {"type": "witness", "base": a, "result": "inconclusive", "value": witness_type}
            continue

        composite_found = True
        for i in range(k - 1):
            x = pow(x, 2, n)
            if stream_mode:
                yield {"type": "square", "iteration": i + 1, "value": format_large_num(x)}
            
            if x == n - 1:
                if stream_mode:
                    yield {"type": "witness", "base": a, "result": "inconclusive", "value": "n-1"}
                composite_found = False
                break
        
        if composite_found:
            if stream_mode:
                yield {"type": "witness", "base": a, "result": "composite"}
                yield {"type": "result", "prime": False, "reason": "composite witness found"}
                return
            return False

    if stream_mode:
        yield {"type": "result", "prime": True, "reason": f"probably prime after {rounds} rounds"}
        return
    return True