function dateToYMDHH(date) {
    const dateStr = date.toISOString()
    const compact = dateStr.replaceAll('-','').replaceAll(':','').replace('T','')
    return compact.substr(0, compact.indexOf('.'))
}

(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const answers = Array.from(document.querySelectorAll('#answers .answer'))
  answers.forEach((answer) => {
    const datetime = answer.querySelector('time').getAttribute('datetime')
    const links = Array.from(answer.querySelectorAll('a'))
    links.forEach((link) => {
      const href = link.href
      if (href.startsWith('http')) {
        const archiveurl = "https://web.archive.org/web/" + dateToYMDHH(new Date(datetime)) + "/" + href;
        link.href = archiveurl;
      }
    })
  })
})()
