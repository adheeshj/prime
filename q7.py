from prime_utils import miller_rabin_stream, small_prime_check
import math

def sieve_primes(limit):
    """Generate primes up to limit using sieve of Eratosthenes"""
    if limit < 2:
        return []
    
    sieve = [True] * (limit + 1)
    sieve[0] = sieve[1] = False
    
    for i in range(2, int(math.sqrt(limit)) + 1):
        if sieve[i]:
            for j in range(i * i, limit + 1, i):
                sieve[j] = False
    
    return [i for i in range(2, limit + 1) if sieve[i]]

def is_prime_with_logs(n):
    """Check if n is prime and return logs for streaming"""
    # First check small primes
    small_result = small_prime_check(n)
    if small_result is not None:
        return small_result, [{"type": "small_prime_check", "result": small_result}]
    
    # Use Miller-Rabin for larger numbers
    logs = []
    is_prime = True
    
    for log_entry in miller_rabin_stream(n, rounds=6):
        logs.append(log_entry)
        if log_entry.get("type") == "result":
            is_prime = log_entry.get("prime", False)
            break
    
    return is_prime, logs

def solve_q7_stream(E, max_attempts=20000, start_hint=None):
    """
    Stream the solution for Question 7: Find two primes p1, p2 such that p1 - p2 = E
    Uses the approach: p1 = E + p2, so iterate p2 and check if E + p2 is prime
    """
    
    if E <= 0 or E % 2 != 0:
        yield {"type": "error", "message": f"E must be a positive even number, got {E}"}
        return
    
    yield {"type": "info", "message": f"Finding primes p1, p2 where p1 - p2 = {E}"}
    yield {"type": "info", "message": "Method: For each prime p2, check if E + p2 is also prime"}
    yield {"type": "info", "message": f"Will test up to {max_attempts} prime candidates"}
    
    # Generate initial batch of primes
    initial_limit = min(100000, max_attempts * 10)  # Start with reasonable limit
    primes = sieve_primes(initial_limit)
    
    yield {"type": "info", "message": f"Generated {len(primes)} primes up to {initial_limit} for testing"}
    
    attempts = 0
    start_index = 0
    
    # If start_hint provided, find starting position
    if start_hint is not None:
        for i, p in enumerate(primes):
            if p >= start_hint:
                start_index = i
                break
        yield {"type": "info", "message": f"Starting from prime #{start_index + 1}: {primes[start_index] if start_index < len(primes) else 'beyond current range'}"}
    
    for i in range(start_index, len(primes)):
        if attempts >= max_attempts:
            yield {"type": "info", "message": f"Reached maximum attempts ({max_attempts})"}
            break
            
        p2 = primes[i]
        p1 = E + p2
        attempts += 1
        
        yield {"type": "checking", "attempt": attempts, "p2": p2, "p1": p1, "message": f"Testing p2={p2}, p1=E+p2={p1}"}
        
        # Check if p1 is prime
        is_prime, logs = is_prime_with_logs(p1)
        
        # Stream the primality test logs
        for log in logs:
            yield log
        
        if is_prime:
            # Found the pair!
            yield {"type": "found", "E": E, "p1": p1, "p2": p2, "difference": p1 - p2, "attempts": attempts}
            yield {"type": "verification", "message": f"Verification: {p1} - {p2} = {p1 - p2} = {E} ✓"}
            yield {"type": "complete", "message": f"Successfully found prime pair for E={E}"}
            return
        else:
            yield {"type": "rejected", "p1": p1, "reason": "not prime"}
    
    # If we get here, we didn't find a solution within the attempts limit
    yield {"type": "incomplete", "message": f"No solution found for E={E} within {attempts} attempts"}
    yield {"type": "info", "message": "Try increasing max_attempts or using a different start_hint"}
