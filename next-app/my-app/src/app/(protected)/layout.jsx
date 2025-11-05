import ProtectedRoute from './protectedLayout';

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="protected-content">
        {children}
      </div>
    </ProtectedRoute>
  );
}
