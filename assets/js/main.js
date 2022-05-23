document.querySelector('#nav-search-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    window.location.href = '/search?q=' + event.target.value;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const themeSwitchers = document.querySelectorAll('.theme-switcher');
  themeSwitchers.forEach((themeSwitcher) => {
    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      themeSwitcher.icon = theme === 'dark' ? 'moon-fill' : 'sun-fill';
      localStorage.setItem('theme', theme);
    }

    const theme = localStorage.getItem('theme') || 'light';
    setTheme(theme);

    themeSwitcher.addEventListener('click', function () {
      const theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
      setTheme(theme);
    });

  });
});
