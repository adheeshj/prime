from prime_utils import miller_rabin_stream, small_prime_check
import random


def is_palindrome(s: str) -> bool:
    """Check if a string is a palindrome."""
    return s == s[::-1]


def generate_palindrome(half_length: int) -> int:
    """Generate a palindrome by creating a random first half and mirroring it."""
    # Generate random digits for first half
    # Make sure first digit is not 0 (to avoid leading zeros)
    first_digit = random.randint(1, 9)
    remaining_digits = [random.randint(0, 9) for _ in range(half_length - 1)]
    
    first_half = [first_digit] + remaining_digits
    first_half_str = ''.join(map(str, first_half))
    
    # Create palindrome by mirroring
    palindrome_str = first_half_str + first_half_str[::-1]
    
    return int(palindrome_str)


def generate_odd_palindrome(half_length: int) -> int:
    """Generate an odd-length palindrome with a middle digit."""
    # Generate random digits for first half
    first_digit = random.randint(1, 9)
    remaining_digits = [random.randint(0, 9) for _ in range(half_length - 1)]
    middle_digit = random.randint(0, 9)
    
    first_half = [first_digit] + remaining_digits
    first_half_str = ''.join(map(str, first_half))
    
    # Create palindrome by mirroring with middle digit
    palindrome_str = first_half_str + str(middle_digit) + first_half_str[::-1]
    
    return int(palindrome_str)


def solve_q5_stream():
    """Stream the solution process for Question 5: Find palindromic prime with at least 50 digits"""
    
    yield {"type": "info", "message": "Starting search for palindromic prime with at least 50 digits..."}
    
    # Start with 50 digits and work our way up if needed
    target_digits = 50
    max_attempts_per_length = 100
    attempt_counter = 0
    
    while target_digits <= 100:  # Cap at 100 digits to avoid infinite search
        yield {"type": "info", "message": f"Searching for {target_digits}-digit palindromic primes..."}
        
        for attempt in range(max_attempts_per_length):
            attempt_counter += 1
            
            # Try both even and odd length palindromes
            for parity in ["even", "odd"]:
                if parity == "even":
                    if target_digits % 2 != 0:
                        continue
                    half_length = target_digits // 2
                    n = generate_palindrome(half_length)
                else:
                    if target_digits % 2 == 0:
                        continue
                    half_length = (target_digits - 1) // 2
                    n = generate_odd_palindrome(half_length)
                
                n_str = str(n)
                actual_digits = len(n_str)
                
                # Ensure we have the right number of digits
                if actual_digits != target_digits:
                    continue
                
                # Verify it's actually a palindrome
                if not is_palindrome(n_str):
                    continue
                
                # Display the candidate - use same format as Q1
                if actual_digits <= 100:
                    display_num = f"{n_str[:25]}...{n_str[-25:]}" if actual_digits > 50 else n_str
                    yield {"type": "checking", "i": attempt_counter, "number": display_num, "length": actual_digits}
                else:
                    yield {"type": "checking", "i": attempt_counter, "number": f"[{actual_digits} digit palindrome]", "length": actual_digits}
                
                # Check small primes first
                small_result = small_prime_check(n)
                if small_result is not None:
                    yield {"type": "small_prime_result", "result": small_result}
                    if small_result:
                        # Found a small palindromic prime
                        if actual_digits <= 100:
                            display_num = f"{n_str[:25]}...{n_str[-25:]}" if actual_digits > 50 else n_str
                            yield {"type": "found", "i": attempt_counter, "number": display_num, "length": actual_digits, "method": "small prime check"}
                        else:
                            yield {"type": "found", "i": attempt_counter, "number": f"[{actual_digits} digit palindrome]", "length": actual_digits, "method": "small prime check"}
                        return
                    else:
                        yield {"type": "rejected", "reason": "divisible by small prime"}
                        continue
                
                # Miller-Rabin test with streaming
                yield {"type": "info", "message": f"Running Miller-Rabin test for {actual_digits}-digit palindrome..."}
                
                is_prime = True
                for log_entry in miller_rabin_stream(n, rounds=8):  # Use more rounds for larger numbers
                    # Forward the Miller-Rabin logs
                    yield log_entry
                    
                    # Check if we found it's composite
                    if log_entry.get("type") == "result" and not log_entry.get("prime", True):
                        is_prime = False
                        break
                
                if is_prime:
                    # Found a palindromic prime!
                    if actual_digits <= 100:
                        display_num = f"{n_str}" if actual_digits > 50 else n_str
                        yield {"type": "found", "i": attempt_counter, "number": display_num, "length": actual_digits, "method": "Miller-Rabin"}
                    else:
                        yield {"type": "found", "i": attempt_counter, "number": f"[{actual_digits} digit palindrome]", "length": actual_digits, "method": "Miller-Rabin"}
                        yield {"type": "complete", "messasge": f"Found {actual_digits}-digit palindromic prime!", "total_attempts": attempt_counter}
                    return
        
        # If we didn't find one with this length, try the next length
        yield {"type": "info", "message": f"No {target_digits}-digit palindromic prime found in {max_attempts_per_length} attempts, trying {target_digits + 1} digits..."}
        target_digits += 1
    
    yield {"type": "complete", "message": f"Search completed - reached maximum digit limit without finding palindromic prime after {attempt_counter} attempts"}
