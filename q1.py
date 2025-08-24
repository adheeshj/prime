from prime_utils import miller_rabin_stream, small_prime_check

def num_digits(n: int) -> int:
    """Return number of digits of n (pure integer math)."""
    d = 1
    while n >= 10 ** d:
        d += 1
    return d

def make_number(i: int) -> int:
    """Create palindromic number 123...i...(i-1)...321 using integers only."""
    n = 0
    # First half
    for k in range(1, i + 1):
        d = num_digits(k)
        n = n * (10 ** d) + k
    # Second half
    for k in range(i - 1, 0, -1):
        d = num_digits(k)
        n = n * (10 ** d) + k
    return n

def solve_q1_stream():
    """Stream the solution process for Question 1"""
    
    yield {"type": "info", "message": "Starting search for palindromic prime between 1000-3000..."}
    
    for i in range(2444, 3001):
        n = make_number(i)
        
        # Only show the number if it's reasonably sized, otherwise just show length
        if len(str(n)) <= 50:
            yield {"type": "checking", "i": i, "number": str(n), "length": len(str(n))}
        else:
            yield {"type": "checking", "i": i, "number": f"[{len(str(n))} digit number]", "length": len(str(n))}
        
        # Check small primes first
        small_result = small_prime_check(n)
        if small_result is not None:
            yield {"type": "small_prime_result", "result": small_result}
            if small_result:
                # For found primes, show first/last 20 digits if too long
                if len(str(n)) <= 100:
                    yield {"type": "found", "i": i, "number": str(n), "method": "small prime check"}
                else:
                    n_str = str(n)
                    display_num = f"{n_str[:20]}...{n_str[-20:]}"
                    yield {"type": "found", "i": i, "number": display_num, "full_length": len(str(n)), "method": "small prime check"}
                return
            else:
                yield {"type": "rejected", "reason": "divisible by small prime"}
                continue

        # Miller-Rabin test with streaming
        yield {"type": "info", "message": f"Running Miller-Rabin test for i={i}..."}
        
        is_prime = True
        for log_entry in miller_rabin_stream(n, rounds=6):
            # Forward the Miller-Rabin logs
            yield log_entry
            
            # Check if we found it's composite
            if log_entry.get("type") == "result" and not log_entry.get("prime", True):
                is_prime = False
                break
        
        if is_prime:
            # For found primes, show first/last 20 digits if too long
            if len(str(n)) <= 100:
                yield {"type": "found", "i": i, "number": str(n), "method": "Miller-Rabin"}
            else:
                n_str = str(n)
                display_num = f"{n_str[:20]}...{n_str[-20:]}"
                yield {"type": "found", "i": i, "number": display_num, "full_length": len(str(n)), "method": "Miller-Rabin"}
            return
            
    yield {"type": "complete", "message": "Search completed - no prime found in range"}