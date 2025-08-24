from prime_utils import miller_rabin_stream, small_prime_check
import math


def sieve_for_range(low, high, max_primes=None):
    """Sieve of Eratosthenes for primes between low and high (inclusive)"""
    if high < 2 or high < low:
        return []
    low = max(low, 2)
    size = high - low + 1
    sieve = [True] * size
    limit = int(math.sqrt(high)) + 1
    primes = []

    # Find small primes up to sqrt(high)
    small_primes = []
    prime_flags = [True] * (limit + 1)
    if len(prime_flags) > 0:
        prime_flags[0] = False
    if len(prime_flags) > 1:
        prime_flags[1] = False
    
    for i in range(2, limit + 1):
        if prime_flags[i]:
            small_primes.append(i)
            for j in range(i*i, limit + 1, i):
                prime_flags[j] = False

    # Mark multiples in range
    for sp in small_primes:
        # Find first multiple in [low, high]
        start_index = max(sp*sp, ((low + sp - 1) // sp) * sp)
        for multiple in range(start_index, high+1, sp):
            if multiple - low < size:
                sieve[multiple - low] = False

    count = 0
    for i in range(size):
        if sieve[i]:
            primes.append(i + low)
            count += 1
            if max_primes and count >= max_primes:
                break

    return primes


def verify_prime_with_logs(n):
    """Verify if n is prime and return result with logs"""
    logs = []
    
    # Check small primes first
    small_result = small_prime_check(n)
    if small_result is not None:
        logs.append({"type": "small_prime_check", "number": n, "result": small_result})
        return small_result, logs
    
    # Miller-Rabin test with streaming
    logs.append({"type": "info", "message": f"Running Miller-Rabin test for {n}..."})
    
    for log_entry in miller_rabin_stream(n, rounds=6):
        logs.append(log_entry)
        if log_entry.get("type") == "result":
            return log_entry.get("prime", False), logs
    
    return False, logs


def solve_q4_stream():
    """Stream the solution process for Question 4: Brocard's conjecture verification"""
    
    # Use the Mersenne primes from Question 3
    p1 = 2203  # First Mersenne prime exponent
    p2 = 2281  # Second Mersenne prime exponent
    
    yield {"type": "info", "message": f"Verifying Brocard's conjecture using p₁={p1} and p₂={p2}"}
    
    # Calculate squares
    p1_squared = p1 ** 2
    p2_squared = p2 ** 2
    
    yield {"type": "info", "message": f"Searching for at least 4 primes between {p1}² = {p1_squared:,} and {p2}² = {p2_squared:,}"}
    yield {"type": "info", "message": f"Range size: {p2_squared - p1_squared:,} numbers"}
    
    # Use sieve to find primes efficiently
    yield {"type": "info", "message": "Using sieve method to find primes in range..."}
    
    try:
        # Find first 10 primes to show we have at least 4
        primes_in_range = sieve_for_range(p1_squared + 1, p2_squared - 1, max_primes=10)
        
        if len(primes_in_range) >= 4:
            yield {"type": "info", "message": f"Sieve found {len(primes_in_range)} prime candidates (verifying first 4)"}
            
            # Verify the first 4 primes individually with streaming
            verified_primes = []
            for i, prime_candidate in enumerate(primes_in_range[:4]):
                yield {"type": "checking", "i": i+1, "number": str(prime_candidate), "length": len(str(prime_candidate))}
                
                # Verify with our prime checker for consistency
                is_prime, logs = verify_prime_with_logs(prime_candidate)
                
                # Yield all the verification logs
                for log in logs:
                    yield log
                
                if is_prime:
                    verified_primes.append(prime_candidate)
                    yield {"type": "found", "i": i+1, "number": str(prime_candidate), "length": len(str(prime_candidate)), "method": "sieve + verification"}
                else:
                    yield {"type": "rejected", "reason": "failed prime verification"}
            
            if len(verified_primes) >= 4:
                yield {"type": "brocard_success", "message": f"Brocard's conjecture verified!", 
                      "p1": p1, "p2": p2, "primes_found": verified_primes[:4], "total_in_range": len(primes_in_range)}
                
                # Show the four primes
                prime_list = [{"prime": p, "position": i+1} for i, p in enumerate(verified_primes[:4])]
                yield {"type": "complete", "message": f"Found {len(verified_primes)} verified primes between {p1}² and {p2}²", 
                      "primes": prime_list, "conjecture_verified": True}
            else:
                yield {"type": "brocard_failed", "message": f"Only found {len(verified_primes)} verified primes, need at least 4"}
                yield {"type": "complete", "message": f"Brocard's conjecture could not be verified with only {len(verified_primes)} primes", 
                      "conjecture_verified": False}
        
        else:
            yield {"type": "brocard_failed", "message": f"Only found {len(primes_in_range)} primes in range, need at least 4"}
            yield {"type": "complete", "message": f"Brocard's conjecture failed - only {len(primes_in_range)} primes found", 
                  "conjecture_verified": False}
            
    except Exception as e:
        yield {"type": "error", "message": f"Error during sieve computation: {str(e)}"}
        yield {"type": "complete", "message": "Search failed due to computational error", "conjecture_verified": False}
