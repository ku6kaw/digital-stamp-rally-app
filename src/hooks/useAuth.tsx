import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// ユーザー情報を格納するためのコンテキスト
const AuthContext = createContext<any>(null);

// カスタムフック: 認証状態を管理する
export const useAuth = () => {
  return useContext(AuthContext);
};

// 認証状態を提供するプロバイダー
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);  // ユーザー情報を保存する状態
  const navigate = useNavigate();

  useEffect(() => {
    // アプリがマウントされた時にローカルストレージからトークンを確認
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);  // トークンをデコード
        setUser(decoded);  // デコードしたユーザー情報を保存
      } catch (error) {
        console.error('トークンのデコードに失敗しました:', error);
        logout();  // トークンが無効の場合ログアウト
      }
    }
  }, []);

  // ログイン処理
  const login = (token: string) => {
    localStorage.setItem('token', token);  // トークンをローカルストレージに保存
    const decoded: any = jwtDecode(token);  // トークンをデコード
    setUser(decoded);  // ユーザー情報を保存
    navigate('/home');  // ログイン後にホームページへリダイレクト
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('token');  // ローカルストレージからトークンを削除
    setUser(null);  // ユーザー情報をクリア
    navigate('/');  // ログアウト後にログインページへリダイレクト
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
