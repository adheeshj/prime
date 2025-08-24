from prime_utils import miller_rabin_stream, small_prime_check

def make_repunit(n: int) -> int:
    """Create repunit: 111...1 (n ones)"""
    return int('1' * n)

def solve_q2_stream():
    """Stream the solution process for Question 2 - Find 5 repunit primes"""
    
    yield {"type": "info", "message": "Starting search for 5 repunit primes (111...1) between N=2 and N=1040..."}
    
    found_primes = []
    
    for n in range(2, 1041):
        repunit = make_repunit(n)
        
        # Only show the number if it's reasonably sized, otherwise just show length
        if n <= 20:
            yield {"type": "checking", "n": n, "number": str(repunit), "length": n}
        else:
            yield {"type": "checking", "n": n, "number": f"[{n} ones]", "length": n}
        
        # Check small primes first
        small_result = small_prime_check(repunit)
        if small_result is not None:
            yield {"type": "small_prime_result", "result": small_result}
            if small_result:
                found_primes.append((n, repunit))
                yield {"type": "found", "n": n, "number": str(repunit), "method": "small prime check", "count": len(found_primes)}
                if len(found_primes) >= 5:
                    yield {"type": "complete", "message": f"Found all 5 repunit primes!", "primes": found_primes}
                    return
                continue
            else:
                yield {"type": "rejected", "reason": "divisible by small prime"}
                continue

        # Miller-Rabin test with streaming
        yield {"type": "info", "message": f"Running Miller-Rabin test for N={n} (repunit with {n} ones)..."}
        
        is_prime = True
        for log_entry in miller_rabin_stream(repunit, rounds=10):  # Use more rounds for higher confidence
            # Forward the Miller-Rabin logs
            yield log_entry
            
            # Check if we found it's composite
            if log_entry.get("type") == "result" and not log_entry.get("prime", True):
                is_prime = False
                break
        
        if is_prime:
            found_primes.append((n, repunit))
            # For found primes, show appropriately
            if n <= 50:
                yield {"type": "found", "n": n, "number": str(repunit), "method": "Miller-Rabin", "count": len(found_primes)}
            else:
                yield {"type": "found", "n": n, "number": f"[{n} ones]", "method": "Miller-Rabin", "count": len(found_primes)}
            
            if len(found_primes) >= 5:
                yield {"type": "complete", "message": f"Found all 5 repunit primes!", "primes": [(n, f"R_{n}") for n, _ in found_primes]}
                return
            
    yield {"type": "complete", "message": f"Search completed - found {len(found_primes)} repunit primes", "primes": [(n, f"R_{n}") for n, _ in found_primes]}