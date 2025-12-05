import { useState } from 'react';
import './App.css';
import { ArticleList } from './components/ArticleList';
import { useQiitaSearch } from './hooks/useQiitaSearch';
import { useQueryParam } from './hooks/useQueryParam';

function App() {
  const initialQuery = useQueryParam('q');
  const { items, loading, error, search } = useQiitaSearch(initialQuery);
  const [inputQuery, setInputQuery] = useState(initialQuery || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(inputQuery);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Voice Agent</h1>
      </header>

      <main>
        <div className="search-section">
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="検索キーワード (例: React)"
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? '検索中...' : '検索'}
            </button>
          </form>
        </div>

        {error && <div className="error-message">エラーが発生しました: {error.message}</div>}
        
        <ArticleList items={items} />
      </main>
    </div>
  );
}

export default App;
