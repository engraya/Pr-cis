import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@layout/Layout';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { Spinner } from '@components/Spinner';
import './App.css';

const HomePage = lazy(() =>
  import('@features/home/HomePage').then(m => ({ default: m.HomePage }))
);

const SummarizePage = lazy(() =>
  import('@features/summarize').then(m => ({ default: m.SummarizePage }))
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<Spinner label="Loading page..." />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="summarize"
              element={
                <Suspense fallback={<Spinner label="Loading summarizer..." />}>
                  <SummarizePage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
