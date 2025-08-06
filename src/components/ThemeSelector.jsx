export default function ThemeSelector({ theme, setTheme }) {
  return (
    <div className="theme-selector">
      <label>Theme:</label>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sports">Sports</option>
      </select>
    </div>
  );
}
