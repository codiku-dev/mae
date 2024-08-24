function install() {
  checkForOLLama();
}

function checkForOLLama() {
  const ollamaPath = '/Applications/OLLama.app';

  if (!require('fs').existsSync(ollamaPath)) {
    console.log('OLLama is not installed.');
  } else {
    console.log('OLLama is already installed.');
  }
}

install();
