function renderResult(matchInfo) {
  const root = document.getElementById('root');
  let template = `
    <div>
      <h1>test</h1>
    </div>
  `
  root.innerHTML = template;
}

export {renderResult};