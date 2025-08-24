from prime_utils import miller_rabin_stream, small_prime_check

def solve_q3_stream():
    """Stream the solution process for Question 3 - Mersenne Primes"""
    
    yield {"type": "info", "message": "Starting search for Mersenne primes 2^p - 1 where p is between 2201-2299..."}
    yield {"type": "info", "message": "Note: We must first verify that p itself is prime before testing 2^p - 1"}
    
    mersenne_primes_found = []
    
    for p in range(2201, 2300):
        yield {"type": "checking_p", "p": p, "message": f"Checking if p={p} is prime..."}
        
        # First check if p itself is prime
        small_result = small_prime_check(p)
        if small_result is not None:
            if not small_result:
                yield {"type": "p_rejected", "p": p, "reason": "p is not prime (divisible by small prime)"}
                continue
            else:
                yield {"type": "p_prime", "p": p, "method": "small prime check"}
        else:
            # Use Miller-Rabin to test if p is prime
            yield {"type": "info", "message": f"Running Miller-Rabin test for p={p}..."}
            
            p_is_prime = True
            for log_entry in miller_rabin_stream(p, rounds=6):
                # Forward the Miller-Rabin logs with modified type to show it's for p
                p_log = log_entry.copy()
                p_log["testing_p"] = True
                yield p_log
                
                # Check if we found p is composite
                if log_entry.get("type") == "result" and not log_entry.get("prime", True):
                    p_is_prime = False
                    break
            
            if not p_is_prime:
                yield {"type": "p_rejected", "p": p, "reason": "p is not prime"}
                continue
            else:
                yield {"type": "p_prime", "p": p, "method": "Miller-Rabin"}
        
        # Now p is prime, so test the Mersenne number 2^p - 1
        mersenne_num = (2 ** p) - 1
        
        # Format the Mersenne number for display
        mersenne_str = str(mersenne_num)
        if len(mersenne_str) <= 50:
            display_num = mersenne_str
        else:
            display_num = f"{mersenne_str[:20]}...{mersenne_str[-20:]}"
        
        yield {
            "type": "checking_mersenne", 
            "p": p, 
            "mersenne_display": display_num,
            "mersenne_digits": len(mersenne_str),
            "message": f"Testing Mersenne number 2^{p} - 1 ({len(mersenne_str)} digits)..."
        }
        
        # Test if the Mersenne number is prime
        small_result = small_prime_check(mersenne_num)
        if small_result is not None:
            if small_result:
                mersenne_primes_found.append((p, display_num, len(mersenne_str)))
                yield {
                    "type": "mersenne_found", 
                    "p": p, 
                    "mersenne_display": display_num,
                    "mersenne_digits": len(mersenne_str),
                    "count": len(mersenne_primes_found),
                    "method": "small prime check"
                }
                if len(mersenne_primes_found) >= 2:
                    break
            else:
                yield {"type": "mersenne_rejected", "p": p, "reason": "divisible by small prime"}
                continue
        else:
            # Use Miller-Rabin to test the Mersenne number
            yield {"type": "info", "message": f"Running Miller-Rabin test for 2^{p} - 1..."}
            
            mersenne_is_prime = True
            for log_entry in miller_rabin_stream(mersenne_num, rounds=6):
                # Forward the Miller-Rabin logs
                yield log_entry
                
                # Check if we found it's composite
                if log_entry.get("type") == "result" and not log_entry.get("prime", True):
                    mersenne_is_prime = False
                    break
            
            if mersenne_is_prime:
                mersenne_primes_found.append((p, display_num, len(mersenne_str)))
                yield {
                    "type": "mersenne_found", 
                    "p": p, 
                    "mersenne_display": display_num,
                    "mersenne_digits": len(mersenne_str),
                    "count": len(mersenne_primes_found),
                    "method": "Miller-Rabin"
                }
                if len(mersenne_primes_found) >= 2:
                    break
            else:
                yield {"type": "mersenne_rejected", "p": p, "reason": "composite"}
    
    # Summary
    if len(mersenne_primes_found) == 2:
        primes_info = [(p, f"2^{p} - 1 ({digits} digits)") for p, display, digits in mersenne_primes_found]
        yield {
            "type": "complete", 
            "message": f"Found both Mersenne primes discovered in 1952",
            "primes": primes_info,
            "mersenne_primes": mersenne_primes_found
        }
    elif len(mersenne_primes_found) > 0:
        primes_info = [(p, f"2^{p} - 1 ({digits} digits)") for p, display, digits in mersenne_primes_found]
        yield {
            "type": "complete", 
            "message": f"Found {len(mersenne_primes_found)} Mersenne prime(s)",
            "primes": primes_info,
            "mersenne_primes": mersenne_primes_found
        }
    else:
        yield {"type": "complete", "message": "No Mersenne primes found in the given range"}