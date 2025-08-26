import { useState, useRef, useEffect } from "react";

const styles = {
  // Main container styles
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"
  },

  // Container and layout
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  },

  // Header styles
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },

  mainTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '20px',
    letterSpacing: '-0.02em'
  },

  subtitle: {
    fontSize: '1.3rem',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
    fontWeight: '300'
  },

  // Card grid
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    padding: '20px 0'
  },

  // Evervault-style card container
  evervaultCardContainer: {
    position: 'relative',
    borderRadius: '24px',
    padding: '2px',
    background: 'transparent',
    cursor: 'pointer',
    minHeight: '200px',
    overflow: 'hidden'
  },

  // Card inner content
  questionCard: {
    position: 'relative',
    height: '100%',
    padding: '30px',
    borderRadius: '22px',
    background: 'rgba(15, 15, 35, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    zIndex: 2,
    overflow: 'hidden'
  },

  // Background pattern overlay (hidden by default)
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '22px',
    background: 'linear-gradient(45deg, #10b981, #3b82f6)',
    opacity: 0,
    transition: 'opacity 0.5s ease',
    zIndex: 1
  },

  // Random text overlay (hidden by default)
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '22px',
    padding: '20px',
    fontSize: '10px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.3)',
    lineHeight: '12px',
    wordBreak: 'break-all',
    opacity: 0,
    transition: 'opacity 0.5s ease',
    zIndex: 1,
    overflow: 'hidden'
  },

  cardTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '15px',
    letterSpacing: '-0.01em',
    position: 'relative',
    zIndex: 10
  },

  cardDescription: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: '1rem',
    lineHeight: '1.6',
    fontWeight: '400',
    position: 'relative',
    zIndex: 10
  },

  // Question detail view (keeping your existing styles)
  questionDetail: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)'
  },

  backButton: {
    marginBottom: '30px',
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)'
  },

  questionHeader: {
    padding: '30px',
    borderRadius: '20px',
    background: 'rgba(15, 15, 35, 0.6)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    marginBottom: '40px'
  },

  questionTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '10px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  questionDesc: {
    fontSize: '1.2rem',
    opacity: 0.9,
    lineHeight: '1.6'
  },

  // Action buttons and inputs
  actionSection: {
    marginBottom: '30px'
  },

  actionButton: {
    padding: '14px 28px',
    borderRadius: '12px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  },

  inputGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },

  inputLabel: {
    color: 'white',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: '500'
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)'
  },

  streamSection: {
    background: 'rgba(15, 15, 35, 0.6)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    padding: '30px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  streamTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px'
  },

  streamOutput: {
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '12px',
    padding: '20px',
    height: '400px',
    overflowY: 'auto',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: '0.9rem',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  streamEmpty: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontStyle: 'italic'
  },

  streamLine: {
    color: '#00ff88',
    marginBottom: '6px',
    wordBreak: 'break-all',
    lineHeight: '1.4'
  },

  stopButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 15px rgba(255, 65, 108, 0.3)'
  }
};

// CSS styles for hover effects and animations
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  .evervault-card:hover .background-pattern {
    opacity: 0.6 !important;
  }
  
  .evervault-card:hover .text-overlay {
    opacity: 1 !important;
  }
  
  .evervault-card:hover .question-card {
    background: rgba(15, 15, 35, 0.95) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-5px) !important;
  }
  
  .input:focus {
    border-color: rgba(102, 126, 234, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
  }
  
  .action-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
  }
  
  .back-button:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    transform: translateY(-2px) !important;
  }
  
  .stop-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(255, 65, 108, 0.4) !important;
  }
`;

// Random string generator for the effect
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
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
  const [cardRandomStrings, setCardRandomStrings] = useState({});

  // Add global styles
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = globalStyles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  // Generate random strings for each card
  useEffect(() => {
    const strings = {};
    questions.forEach(q => {
      strings[q.id] = generateRandomString(1000);
    });
    setCardRandomStrings(strings);
  }, []);

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

  // Handle mouse move for card effect
  const handleCardMouseMove = (e, cardId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update the gradient position based on mouse position
    const card = e.currentTarget;
    const pattern = card.querySelector('.background-pattern');
    if (pattern) {
      pattern.style.background = `radial-gradient(250px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.6), rgba(59, 130, 246, 0.6), transparent)`;
    }
    
    // Generate new random string on mouse move
    setCardRandomStrings(prev => ({
      ...prev,
      [cardId]: generateRandomString(1000)
    }));
  };

  // Your existing functions (keeping them unchanged)
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
        setStreamLogs(prev => [...prev, { type: 'error', message: `Connection error: ${error.message}` }]);
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
          return `🔍 Attempt ${log.attempt}: Testing p2=${log.p2}, p1=${log.p1} (p1 = E + p2)`;
        } else if (log.n !== undefined) {
          return `🔍 Checking N=${log.n}, repunit=${log.number} (${log.length} digits)`;
        } else {
          return `🔍 Checking i=${log.i}, number=${log.number} (${log.length} digits)`;
        }
      case 'found':
        if (log.E !== undefined && log.p1 !== undefined && log.p2 !== undefined) {
          return `🏆 SOLUTION FOUND: E=${log.E}, p1=${log.p1}, p2=${log.p2} (difference=${log.difference}) after ${log.attempts} attempts`;
        } else if (log.n !== undefined) {
          return `🏆 FOUND REPUNIT PRIME #${log.count}: N=${log.n}, number=${log.number} (via ${log.method})`;
        } else {
          if (log.full_length) {
            return `🏆 FOUND PRIME: i=${log.i}, ${log.full_length} digit number: ${log.number} (via ${log.method})`;
          } else {
            return `🏆 FOUND PRIME: i=${log.i}, number=${log.number} (via ${log.method})`;
          }
        }
      case 'complete':
        return `🎊 COMPLETE: ${log.message}`;
      case 'error':
        return `❌ Error: ${log.message}`;
      default:
        return `📝 ${log.message || JSON.stringify(log)}`;
    }
  };

  if (selectedCard) {
    return (
      <div style={styles.questionDetail}>
        <div style={styles.container}>
          <button
            style={styles.backButton}
            className="back-button"
            onClick={() => setSelectedCard(null)}
          >
            ← Back to Questions
          </button>
          
          <div style={styles.questionHeader}>
            <h1 style={styles.questionTitle}>{selectedCard.title}</h1>
            <p style={styles.questionDesc}>{selectedCard.description}</p>
          </div>

          {/* Prime Tester Section */}
          <div style={styles.streamSection}>
            <h2 style={styles.streamTitle}>🧮 Prime Tester</h2>
            <div style={styles.inputGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Enter number to test:</label>
                <input
                  type="text"
                  value={primeNumber}
                  onChange={(e) => setPrimeNumber(e.target.value)}
                  placeholder="Enter a large number..."
                  style={styles.input}
                  className="input"
                />
              </div>
            </div>
            <button
              onClick={testPrimeStream}
              disabled={isStreaming || !primeNumber.trim()}
              style={{
                ...styles.actionButton,
                opacity: (isStreaming || !primeNumber.trim()) ? 0.5 : 1,
                cursor: (isStreaming || !primeNumber.trim()) ? 'not-allowed' : 'pointer'
              }}
              className="action-button"
            >
              🔍 Test Prime
            </button>
          </div>

          {/* Question-specific controls */}
          <div style={styles.actionSection}>
            {selectedCard.id === 7 ? (
              <div style={styles.streamSection}>
                <h3 style={{...styles.streamTitle, fontSize: '1.2rem'}}>Question 7 Parameters</h3>
                <div style={styles.inputGrid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>E value (required):</label>
                    <input
                      type="text"
                      value={q7E}
                      onChange={(e) => setQ7E(e.target.value)}
                      placeholder="Enter E value..."
                      style={styles.input}
                      className="input"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Start value (optional):</label>
                    <input
                      type="text"
                      value={q7Start}
                      onChange={(e) => setQ7Start(e.target.value)}
                      placeholder="Enter start value..."
                      style={styles.input}
                      className="input"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Max attempts (optional):</label>
                    <input
                      type="text"
                      value={q7Attempts}
                      onChange={(e) => setQ7Attempts(e.target.value)}
                      placeholder="Enter max attempts..."
                      style={styles.input}
                      className="input"
                    />
                  </div>
                </div>
                <button
                  onClick={() => runQuestion7(q7E, q7Start, q7Attempts)}
                  disabled={isStreaming || !q7E.trim()}
                  style={{
                    ...styles.actionButton,
                    opacity: (isStreaming || !q7E.trim()) ? 0.5 : 1,
                    cursor: (isStreaming || !q7E.trim()) ? 'not-allowed' : 'pointer'
                  }}
                  className="action-button"
                >
                  🚀 Run Question 7
                </button>
              </div>
            ) : (
              <button
                onClick={selectedCard.id === 1 ? runQuestion1 : selectedCard.id === 2 ? runQuestion2 : selectedCard.id === 3 ? runQuestion3 : selectedCard.id === 4 ? runQuestion4 : selectedCard.id === 5 ? runQuestion5 : runQuestion6}
                disabled={isStreaming}
                style={{
                  ...styles.actionButton,
                  opacity: isStreaming ? 0.5 : 1,
                  cursor: isStreaming ? 'not-allowed' : 'pointer'
                }}
                className="action-button"
              >
                🚀 Run Question {selectedCard.id}
              </button>
            )}
          </div>

          {/* Stream Controls */}
          {isStreaming && (
            <div style={styles.actionSection}>
              <button
                onClick={stopStream}
                style={styles.stopButton}
                className="stop-button"
              >
                🛑 Stop Stream
              </button>
            </div>
          )}

          {/* Stream Output */}
          <div style={styles.streamSection}>
            <h2 style={styles.streamTitle}>📡 Live Stream Output</h2>
            <div style={styles.streamOutput}>
              {streamLogs.length === 0 ? (
                <div style={styles.streamEmpty}>Waiting for stream data...</div>
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
          <h1 style={styles.mainTitle}>Prime Number Explorer</h1>
          <p style={styles.subtitle}>
            Explore fascinating prime number problems with real-time Miller-Rabin testing and witness visualization
          </p>
        </div>
        
        <div style={styles.cardGrid}>
          {questions.map((question) => (
            <div
              key={question.id}
              style={styles.evervaultCardContainer}
              className="evervault-card"
              onClick={() => setSelectedCard(question)}
              onMouseMove={(e) => handleCardMouseMove(e, question.id)}
            >
              {/* Background pattern overlay */}
              <div 
                style={styles.backgroundPattern} 
                className="background-pattern"
              />
              
              {/* Random text overlay */}
              <div 
                style={styles.textOverlay} 
                className="text-overlay"
              >
                {cardRandomStrings[question.id] || ''}
              </div>
              
              {/* Card content */}
              <div style={styles.questionCard} className="question-card">
                <h3 style={styles.cardTitle}>{question.title}</h3>
                <p style={styles.cardDescription}>{question.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
