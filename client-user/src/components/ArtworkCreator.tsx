import  { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImage = async () => {
    if (!prompt) return alert("Please enter a prompt!");
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/Image/generate', { prompt });
      const url = response.data.data[0].url;
      setImageUrl(url);
    } catch (err:any) {
      setError(err.response?.data?.message || 'Failed to generate image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>AI Image Generator 🎨</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
        style={styles.input}
      />
      <button onClick={handleGenerateImage} style={styles.button} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {imageUrl && (
        <div>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="AI Generated" style={styles.image} />
        </div>
      )}
    </div>
  );
};

// Simple CSS styles
const styles = {
  container: { textAlign: 'center' as 'center', padding: '20px' },
  input: { width: '80%', padding: '10px', margin: '10px 0', fontSize: '16px' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  image: { maxWidth: '100%', marginTop: '20px' },
  error: { color: 'red', marginTop: '10px' }
};

export default ImageGenerator;
