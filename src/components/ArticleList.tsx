import type { QiitaItem } from '../services/qiita';
import './ArticleList.css';

interface ArticleListProps {
  items: QiitaItem[];
}

export const ArticleList = ({ items }: ArticleListProps) => {
  if (items.length === 0) {
    return <div className="empty-state">記事が見つかりませんでした。</div>;
  }

  return (
    <div className="article-list">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="article-card"
        >
          <div className="article-header">
            <img
              src={item.user.profile_image_url}
              alt={item.user.name}
              className="user-icon"
            />
            <span className="user-name">@{item.user.id}</span>
          </div>
          <h2 className="article-title">{item.title}</h2>
          <div className="article-footer">
            <span className="likes">👍 {item.likes_count}</span>
            <span className="date">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};
