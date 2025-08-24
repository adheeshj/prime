import { useState, useRef, useEffect } from "react";

const styles = {
  // Main container styles
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 35%, #1e293b 100%)',
    fontFamily: 'Arial, sans-serif'
  },
  
  // Container and layout
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px'
  },
  
  // Header styles
  header: {
    textAlign: 'center',
    marginBottom: '48px'
  },
  mainTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#d1d5db',
    maxWidth: '768px',
    margin: '0 auto'
  },
  
  // Card grid and individual cards
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  questionCard: {
    padding: '24px',
    borderRadius: '12px',
    cursor: 'pointer',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  questionCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.3)'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '12px'
  },
  cardSubtitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '12px'
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  
  // Question detail view
  questionDetail: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 35%, #1e293b 100%)'
  },
  backButton: {
    marginBottom: '24px',
    padding: '12px 16px',
    backgroundColor: '#475569',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s'
  },
  backButtonHover: {
    backgroundColor: '#334155'
  },
  questionHeader: {
    padding: '24px',
    borderRadius: '12px',
    color: 'white',
    marginBottom: '32px'
  },
  questionTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  questionSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '16px'
  },
  questionDesc: {
    fontSize: '1.125rem',
    opacity: 0.9
  },
  
  // Action buttons
  actionSection: {
    marginBottom: '24px'
  },
  actionButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
    color: 'white'
  },
  actionButtonDisabled: {
    backgroundColor: '#6b7280',
    cursor: 'not-allowed'
  },
  
  // Input styles for Q7
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputLabel: {
    display: 'block',
    color: 'white',
    marginBottom: '8px',
    fontSize: '0.875rem'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#1e293b',
    color: 'white',
    border: '1px solid #475569',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  inputFocus: {
    borderColor: '#06b6d4'
  },
  
  // Prime tester section
  primeTesterSection: {
    backgroundColor: '#1e293b',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '32px'
  },
  primeTesterTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '16px'
  },
  primeTesterInputs: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  primeTesterInput: {
    flex: '1',
    minWidth: '200px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#475569',
    color: 'white',
    border: '1px solid #64748b',
    fontSize: '1rem',
    outline: 'none'
  },
  
  // Control buttons
  controlSection: {
    marginBottom: '24px'
  },
  stopButton: {
    padding: '12px 24px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s'
  },
  stopButtonHover: {
    backgroundColor: '#b91c1c'
  },
  
  // Stream output
  streamSection: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '24px'
  },
  streamTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '16px'
  },
  streamOutput: {
    backgroundColor: '#000000',
    borderRadius: '8px',
    padding: '16px',
    height: '384px',
    overflowY: 'auto',
    fontFamily: 'Monaco, monospace',
    fontSize: '0.875rem'
  },
  streamEmpty: {
    color: '#6b7280'
  },
  streamLine: {
    color: '#10b981',
    marginBottom: '4px',
    wordBreak: 'break-all'
  }
};

// Color gradients for different questions
const questionColors = {
  1: 'linear-gradient(135deg, #9333ea, #ec4899)',
  2: 'linear-gradient(135deg, #2563eb, #06b6d4)',
  3: 'linear-gradient(135deg, #059669, #10b981)',
  4: 'linear-gradient(135deg, #dc2626, #f97316)',
  5: 'linear-gradient(135deg, #4f46e5, #9333ea)',
  6: 'linear-gradient(135deg, #d97706, #f97316)',
  7: 'linear-gradient(135deg, #0d9488, #059669)'
};

const buttonColors = {
  1: { normal: '#9333ea', hover: '#7c3aed' },
  2: { normal: '#2563eb', hover: '#1d4ed8' },
  3: { normal: '#059669', hover: '#047857' },
  4: { normal: '#dc2626', hover: '#b91c1c' },
  5: { normal: '#4f46e5', hover: '#4338ca' },
  6: { normal: '#d97706', hover: '#b45309' },
  7: { normal: '#0d9488', hover: '#0f766e' }
};

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [primeNumber, setPrimeNumber] = useState("");
  const [streamLogs, setStreamLogs] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamStateRef = useRef({ controller: null, reader: null });
  const [q7E, setQ7E] = useState("");
  const [q7Start, setQ7Start] = useState("");
  const [q7Attempts, setQ7Attempts] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (streamStateRef.current.controller) {
        streamStateRef.current.controller.abort();
      }
      if (streamStateRef.current.reader) {
        streamStateRef.current.reader.cancel().catch(() => {});
      }
    };
  }, []);

  const questions = [
    {
      id: 1,
      title: "Prime Pattern Discovery",
      description: "Find the palindromic prime 123...i...321 where i is between 1000-3000"
    },
    {
      id: 2,
      title: "Repunit Primes",
      description: "Find 5 primes of the form 111...1 (N ones) between N=2 and N=1040"
    },
    {
      id: 3,
      title: "Mersenne Primes",
      description: "Find primes of the form 2^p - 1 between p=2201 and p=2299"
    },
    {
      id: 4,
      title: "Brocard's Conjecture",
      description: "Find 4 primes between squares of consecutive primes"
    },
    {
      id: 5,
      title: "Palindromic Primes",
      description: "Find a palindromic prime with at least 50 digits"
    },
    {
      id: 6,
      title: "Perfect Numbers",
      description: "Prove 2^(p-1)(2^p - 1) yields a perfect number using primes from Q3"
    },
    {
      id: 7,
      title: "Prime Conjectures",
      description: "Test famous prime conjectures on numbers with 50+ digits"
    }
  ];

  const stopStream = async () => {
    console.log('Stopping stream...');
    setIsStreaming(false);

    const { controller, reader } = streamStateRef.current;

    try {
      if (controller && !controller.signal.aborted) {
        console.log('Aborting controller...');
        controller.abort();
      }

      if (reader) {
        console.log('Cancelling reader...');
        try {
          await reader.cancel();
        } catch (e) {
          console.log('Reader cancel error (ignored):', e);
        }
      }
    } catch (error) {
      console.log('Stop stream error (ignored):', error);
    }

    streamStateRef.current = { controller: null, reader: null };
    console.log('Stream stop complete');
  };

  const startStream = async (endpoint) => {
    console.log('Starting stream to:', endpoint);
    await stopStream();
    await new Promise(resolve => setTimeout(resolve, 100));

    setStreamLogs([]);
    setIsStreaming(true);

    const controller = new AbortController();
    streamStateRef.current.controller = controller;

    try {
      const response = await fetch(endpoint, {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Got response, starting to read stream...');
      const reader = response.body.getReader();
      streamStateRef.current.reader = reader;
      const decoder = new TextDecoder();

      try {
        while (true) {
          if (controller.signal.aborted) {
            console.log('Stream aborted before read');
            break;
          }

          const { done, value } = await reader.read();

          if (done) {
            console.log('Stream completed normally');
            break;
          }

          if (controller.signal.aborted) {
            console.log('Stream aborted after read');
            break;
          }

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                setStreamLogs(prev => [...prev, data]);
              } catch (e) {
                console.log('JSON parse error:', e);
              }
            }
          }
        }
      } catch (readError) {
        if (readError.name === 'AbortError' || controller.signal.aborted) {
          console.log('Stream read was aborted by user');
        } else {
          throw readError;
        }
      } finally {
        if (streamStateRef.current.reader === reader) {
          streamStateRef.current.reader = null;
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !controller.signal.aborted) {
        console.error('Stream error:', error);
        setStreamLogs(prev => [...prev, {
          type: 'error',
          message: `Connection error: ${error.message}`
        }]);
      } else {
        console.log('Stream fetch was aborted normally');
      }
    } finally {
      if (streamStateRef.current.controller === controller) {
        streamStateRef.current.controller = null;
      }
      setIsStreaming(false);
      console.log('Stream cleanup complete');
    }
  };

  const testPrimeStream = async () => {
    if (!primeNumber.trim()) return;
    await startStream(`http://localhost:8000/api/testprime/stream?n=${primeNumber}`);
  };

  const runQuestion1 = async () => {
    await startStream('http://localhost:8000/api/question1/stream');
  };

  const runQuestion2 = async () => {
    await startStream('http://localhost:8000/api/question2/stream');
  };

  const runQuestion3 = async () => {
    await startStream('http://localhost:8000/api/question3/stream');
  };

  const runQuestion4 = async () => {
    await startStream('http://localhost:8000/api/question4/stream');
  };

  const runQuestion5 = async () => {
    await startStream('http://localhost:8000/api/question5/stream');
  };

  const runQuestion6 = async () => {
    await startStream('http://localhost:8000/api/question6/stream');
  };

  const runQuestion7 = async (E, start = "", attempts = "") => {
    const params = new URLSearchParams();
    params.set("E", E);
    if (start) params.set("start", start);
    if (attempts) params.set("attempts", attempts);
    await startStream(`http://localhost:8000/api/question7/stream?${params.toString()}`);
  };

  const formatLogEntry = (log) => {
    switch (log.type) {
      case 'test':
        if (log.testing_p) {
          return `🎯 Round ${log.round}: Testing base ${log.base} for p=${log.p || ''}, initial value: ${log.initial_value}`;
        }
        return `🎯 Round ${log.round}: Testing base ${log.base}, initial value: ${log.initial_value}`;

      case 'witness':
        if (log.result === 'composite') {
          return `❌ Base ${log.base} is a WITNESS (proves composite)`;
        } else {
          return `✅ Base ${log.base} passed (found ${log.value})`;
        }

      case 'square':
        return ` └─ Square ${log.iteration}: ${log.value}`;

      case 'small_prime_check':
        return log.result ? '✅ Found in small primes list' : '❌ Divisible by small prime';

      case 'small_prime_result':
        return log.result ? '✅ Found in small primes list' : '❌ Divisible by small prime';

      case 'result':
        if (log.testing_p) {
          return log.prime ? `🎉 p is PRIME: ${log.reason}` : `💥 p is NOT PRIME: ${log.reason}`;
        }
        return log.prime ? `🎉 RESULT: ${log.reason}` : `💥 RESULT: NOT PRIME (${log.reason})`;

      case 'checking':
        if (log.attempt !== undefined && log.p1 !== undefined && log.p2 !== undefined) {
          // Question 7 format
          return `🔍 Attempt ${log.attempt}: Testing p2=${log.p2}, p1=${log.p1} (p1 = E + p2)`;
        } else if (log.n !== undefined) {
          // Question 2 format
          return `🔍 Checking N=${log.n}, repunit=${log.number} (${log.length} digits)`;
        } else {
          // Question 1 format
          return `🔍 Checking i=${log.i}, number=${log.number} (${log.length} digits)`;
        }

      case 'checking_p':
        return `🔍 Step 1: Testing if p=${log.p} is prime...`;

      case 'p_rejected':
        return `❌ p=${log.p} rejected: ${log.reason}`;

      case 'p_prime':
        return `✅ p=${log.p} is PRIME (via ${log.method})`;

      case 'checking_mersenne':
        return `🔍 Step 2: Testing Mersenne number 2^${log.p} - 1 = ${log.mersenne_display} (${log.mersenne_digits} digits)`;

      case 'mersenne_found':
        return `🏆 MERSENNE PRIME #${log.count}: 2^${log.p} - 1 (${log.mersenne_digits} digits) via ${log.method}`;

      case 'mersenne_rejected':
        return `❌ 2^${log.p} - 1 rejected: ${log.reason}`;

      case 'found':
        if (log.E !== undefined && log.p1 !== undefined && log.p2 !== undefined) {
          // Question 7 format
          return `🏆 SOLUTION FOUND: E=${log.E}, p1=${log.p1}, p2=${log.p2} (difference=${log.difference}) after ${log.attempts} attempts`;
        } else if (log.n !== undefined) {
          // Question 2 format
          return `🏆 FOUND REPUNIT PRIME #${log.count}: N=${log.n}, number=${log.number} (via ${log.method})`;
        } else {
          // Question 1 format
          if (log.full_length) {
            return `🏆 FOUND PRIME: i=${log.i}, ${log.full_length} digit number: ${log.number} (via ${log.method})`;
          } else {
            return `🏆 FOUND PRIME: i=${log.i}, number=${log.number} (via ${log.method})`;
          }
        }

      case 'complete':
        if (log.mersenne_primes) {
          const primesList = Array.isArray(log.mersenne_primes) ?
            log.mersenne_primes.map(item => {
              if (Array.isArray(item) && item.length >= 3) {
                const [p, _display, digits] = item;
                return `p=${p} (${digits} digits)`;
              }
              return JSON.stringify(item);
            }).join(', ') : '';
          return `🎊 COMPLETE: ${log.message}${primesList ? ` - Primes: ${primesList}` : ''}`;
        } else if (log.primes) {
          const primesList = Array.isArray(log.primes) ?
            log.primes.map(item => {
              if (item && typeof item === 'object' && 'prime' in item && 'position' in item) {
                return `Prime #${item.position}: ${item.prime}`;
              }
              if (Array.isArray(item) && item.length >= 2) {
                const [a, b] = item;
                return `N=${a} (${b})`;
              }
              return JSON.stringify(item);
            }).join(', ') : '';
          return `🎊 COMPLETE: ${log.message}${primesList ? ` - Primes found: ${primesList}` : ''}`;
        }
        return `🎊 COMPLETE: ${log.message}`;

      case 'verification':
        return `✅ VERIFICATION: ${log.message}`;

      case 'incomplete':
        return `⚠️ INCOMPLETE: ${log.message}`;

      case 'rejected':
        return `❌ Rejected: ${log.reason}`;

      case 'info':
        return `ℹ️ ${log.message}`;

      case 'error':
        return `❌ Error: ${log.message}`;

      case 'brocard_success':
        return `🎊 BROCARD SUCCESS: ${log.message}`;

      case 'brocard_failed':
        return `❌ BROCARD FAILED: ${log.message}`;

      default:
        return `📝 ${log.message || JSON.stringify(log)}`;
    }
  };

  if (selectedCard) {
    return (
      <div style={styles.appContainer}>
        <div style={styles.container}>
          <button
            style={{
              ...styles.backButton,
              ...(hoveredButton === 'back' ? styles.backButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => setSelectedCard(null)}
          >
            ← Back to Questions
          </button>

          <div style={{
            ...styles.questionHeader,
            background: questionColors[selectedCard.id]
          }}>
            <h1 style={styles.questionTitle}>Question {selectedCard.id}</h1>
            <h2 style={styles.questionSubtitle}>{selectedCard.title}</h2>
            <p style={styles.questionDesc}>{selectedCard.description}</p>
          </div>

          {selectedCard.id === 1 && (
            <div style={styles.actionSection}>
              <button
                onClick={runQuestion1}
                disabled={isStreaming}
                style={{
                  ...styles.actionButton,
                  backgroundColor: isStreaming ? '#6b7280' : 
                    (hoveredButton === 'q1' ? buttonColors[1].hover : buttonColors[1].normal),
                  ...(isStreaming ? styles.actionButtonDisabled : {})
                }}
                onMouseEnter={() => setHoveredButton('q1')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isStreaming ? 'Running...' : 'Run Question 1'}
              </button>
            </div>
          )}

          {selectedCard.id === 2 && (
            <div style={styles.actionSection}>
              <button
                onClick={runQuestion2}
                disabled={isStreaming}
                style={{
                  ...styles.actionButton,
                  backgroundColor: isStreaming ? '#6b7280' : 
                    (hoveredButton === 'q2' ? buttonColors[2].hover : buttonColors[2].normal),
                  ...(isStreaming ? styles.actionButtonDisabled : {})
                }}
                onMouseEnter={() => setHoveredButton('q2')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isStreaming ? 'Running...' : 'Run Question 2'}
              </button>
            </div>
          )}

          {selectedCard.id === 3 && (
            <div style={styles.actionSection}>
              <button
                onClick={runQuestion3}
                disabled={isStreaming}
                style={{
                  ...styles.actionButton,
                  backgroundColor: isStreaming ? '#6b7280' : 
                    (hoveredButton === 'q3' ? buttonColors[3].hover : buttonColors[3].normal),
                  ...(isStreaming ? styles.actionButtonDisabled : {})
                }}
                onMouseEnter={() => setHoveredButton('q3')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isStreaming ? 'Running...' : 'Run Question 3'}
              </button>
            </div>
          )}

          {selectedCard.id === 4 && (
            <div style={styles.actionSection}>
              <button
                onClick={runQuestion4}
                disabled={isStreaming}
                style={{
                  ...styles.actionButton,
                  backgroundColor: isStreaming ? '#6b7280' : 
                    (hoveredButton === 'q4' ? buttonColors[4].hover : buttonColors[4].normal),
                  ...(isStreaming ? styles.actionButtonDisabled : {})
                }}
                onMouseEnter={() => setHoveredButton('q4')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isStreaming ? 'Running...' : 'Run Question 4'}
              </button>
            </div>
          )}

          {selectedCard.id === 5 && (
            <div style={styles.actionSection}>
              <button
                onClick={runQuestion5}
                disabled={isStreaming}
                style={{
                  ...styles.actionButton,
                  backgroundColor: isStreaming ? '#6b7280' : 
                    (hoveredButton === 'q5' ? buttonColors[5].hover : buttonColors[5].normal),
                  ...(isStreaming ? styles.actionButtonDisabled : {})
                }}
                onMouseEnter={() => setHoveredButton('q5')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isStreaming ? 'Running...' : 'Run Question 5'}
              </button>
            </div>
          )}

          {selectedCard.id === 6 && (
            <div style={styles.actionSection}>
              <button
                onClick={runQuestion6}
                disabled={isStreaming}
                style={{
                  ...styles.actionButton,
                  backgroundColor: isStreaming ? '#6b7280' : 
                    (hoveredButton === 'q6' ? buttonColors[6].hover : buttonColors[6].normal),
                  ...(isStreaming ? styles.actionButtonDisabled : {})
                }}
                onMouseEnter={() => setHoveredButton('q6')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isStreaming ? 'Running...' : 'Run Question 6'}
              </button>
            </div>
          )}

          {selectedCard.id === 7 && (
            <div style={styles.actionSection}>
              <div style={styles.inputGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>E (even number):</label>
                  <input
                    type="text"
                    value={q7E}
                    onChange={(e) => setQ7E(e.target.value)}
                    style={styles.input}
                    placeholder="e.g., 2, 4, 6..."
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Start hint (optional):</label>
                  <input
                    type="text"
                    value={q7Start}
                    onChange={(e) => setQ7Start(e.target.value)}
                    style={styles.input}
                    placeholder="Starting prime"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Max attempts (optional):</label>
                  <input
                    type="text"
                    value={q7Attempts}
                    onChange={(e) => setQ7Attempts(e.target.value)}
                    style={styles.input}
                    placeholder="Default: 20000"
                  />
                </div>
              </div>
              <button
                onClick={() => runQuestion7(q7E, q7Start, q7Attempts)}
                disabled={isStreaming || !q7E.trim()}
                style={{
                  ...styles.actionButton,
                  backgroundColor: (isStreaming || !q7E.trim()) ? '#6b7280' : 
                    (hoveredButton === 'q7' ? buttonColors[7].hover : buttonColors[7].normal),
                  ...((isStreaming || !q7E.trim()) ? styles.actionButtonDisabled : {})
                }}
                onMouseEnter={() => setHoveredButton('q7')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {isStreaming ? 'Running...' : 'Run Question 7'}
              </button>
            </div>
          )}

          {/* Prime Tester Section */}
          

          {/* Control Buttons */}
          {isStreaming && (
            <div style={styles.controlSection}>
              <button
                onClick={stopStream}
                style={{
                  ...styles.stopButton,
                  backgroundColor: hoveredButton === 'stop' ? styles.stopButtonHover.backgroundColor : styles.stopButton.backgroundColor
                }}
                onMouseEnter={() => setHoveredButton('stop')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Stop Stream
              </button>
            </div>
          )}

          {/* Stream Output */}
          <div style={styles.streamSection}>
            <h3 style={styles.streamTitle}>🔍 Live Output</h3>
            <div style={styles.streamOutput}>
              {streamLogs.length === 0 ? (
                <div style={styles.streamEmpty}>No output yet. Click a button to start.</div>
              ) : (
                streamLogs.map((log, index) => (
                  <div key={index} style={styles.streamLine}>
                    {formatLogEntry(log)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div style={styles.appContainer}>
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>
          🔢 Prime Explorer
        </h1>
        <p style={styles.subtitle}>
          Explore fascinating prime number problems with real-time Miller-Rabin testing and witness visualization
        </p>
      </div>

      {/* ADD Prime Tester Section HERE - on the main page */}
      <div style={styles.primeTesterSection}>
        <h3 style={styles.primeTesterTitle}>🧪 Prime Tester</h3>
        <div style={styles.primeTesterInputs}>
          <input
            type="text"
            value={primeNumber}
            onChange={(e) => setPrimeNumber(e.target.value)}
            style={styles.primeTesterInput}
            placeholder="Enter a number to test for primality..."
          />
          <button
            onClick={testPrimeStream}
            disabled={isStreaming || !primeNumber.trim()}
            style={{
              ...styles.actionButton,
              backgroundColor: (isStreaming || !primeNumber.trim()) ? '#6b7280' : 
                (hoveredButton === 'test' ? buttonColors[2].hover : buttonColors[2].normal),
              ...((isStreaming || !primeNumber.trim()) ? styles.actionButtonDisabled : {})
            }}
            onMouseEnter={() => setHoveredButton('test')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {isStreaming ? 'Testing...' : 'Test Prime'}
          </button>
        </div>
      </div>

      {/* ADD Stream Output Section HERE if you want it on main page too */}
      {streamLogs.length > 0 && (
        <div style={styles.streamSection}>
          <h3 style={styles.streamTitle}>🔍 Prime Test Results</h3>
          <div style={styles.streamOutput}>
            {streamLogs.map((log, index) => (
              <div key={index} style={styles.streamLine}>
                {formatLogEntry(log)}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.cardGrid}>
        {questions.map((question) => (
          <div
            key={question.id}
            onClick={() => setSelectedCard(question)}
            onMouseEnter={() => setHoveredCard(question.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              ...styles.questionCard,
              background: questionColors[question.id],
              ...(hoveredCard === question.id ? styles.questionCardHover : {})
            }}
          >
            <h3 style={styles.cardTitle}>
              Question {question.id}
            </h3>
            <h4 style={styles.cardSubtitle}>
              {question.title}
            </h4>
            <p style={styles.cardDescription}>
              {question.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default App;
