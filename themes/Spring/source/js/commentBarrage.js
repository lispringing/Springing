if (typeof testjsflag === 'undefined') {
  var testjsflag

  const commentBarrageConfig = {
    colors: [
      ['rgba(56,106,178,0.93)', 'rgba(255,255,255,0.8)'],
      ['rgba(146,72,240,0.93)', 'rgba(255,255,255,0.8)'],
      ['rgba(45,165,93,0.93)', 'rgba(255,255,255,0.8)'],
      ['rgba(255,197,5,0.93)', 'rgba(255,255,255,0.9)'],
      ['rgba(212,78,48,0.93)', 'rgba(255,255,255,0.8)']
    ],
    maxBarrage: 2,
    barrageTime: 3000,
    twikooUrl: 'https://twikoo.happyking.top',
    accessToken: '034b789cb954d752ee9e8e146c9d1a91',
    pageUrl: window.location.pathname,
    barrageTimer: [],
    barrageList: [],
    barrageIndex: 0,
    dom: document.querySelector('.comment-barrage'),
    intervalId: null
  }

  function resetCommentBarragePosition() {
    let dom = commentBarrageConfig.dom || document.querySelector('.comment-barrage')
    if (!dom) return

    if (dom.parentElement !== document.body) {
      document.body.appendChild(dom)
    }

    dom = commentBarrageConfig.dom = dom

    let bottomOffset = 10
    const rightside = document.getElementById('rightside')
    if (rightside && window.innerWidth > 768) {
      const rect = rightside.getBoundingClientRect()
      if (rect.top > 0 && rect.top < window.innerHeight) {
        bottomOffset = Math.max(10, Math.round(window.innerHeight - rect.top + 12))
      }
    }

    dom.style.setProperty('position', 'fixed', 'important')
    dom.style.setProperty('left', 'auto', 'important')
    dom.style.setProperty('right', '10px', 'important')
    dom.style.setProperty('bottom', `${bottomOffset}px`, 'important')
    dom.style.setProperty('z-index', '101', 'important')
  }

  function commentLinkFilter(data) {
    data.sort((a, b) => a.created - b.created)
    const newData = []
    data.forEach(item => {
      newData.push(...getCommentReplies(item))
    })
    return newData
  }

  function getCommentReplies(item) {
    if (!item.replies) return []
    const replies = [item]
    item.replies.forEach(reply => {
      replies.push(...getCommentReplies(reply))
    })
    return replies
  }

  function popCommentBarrage(data) {
    if (!commentBarrageConfig.dom) return

    const barrage = document.createElement('div')
    barrage.className = 'comment-barrage-item'

    const ran = Math.floor(Math.random() * commentBarrageConfig.colors.length)
    barrage.style.background = commentBarrageConfig.colors[ran][0]
    barrage.style.color = commentBarrageConfig.colors[ran][1]

    barrage.innerHTML = `
      <div class="barrageHead">
        <div class="barrageNick">${data.nick}</div>
        <img class="barrageAvatar" src="https://cravatar.cn/avatar/${data.mailMd5}"/>
      </div>
      <div class="barrageContent">${data.comment}</div>
    `

    commentBarrageConfig.barrageTimer.push(barrage)
    commentBarrageConfig.dom.append(barrage)
  }

  function removeCommentBarrage(barrage) {
    barrage.className = 'comment-barrage-item out'
    setTimeout(() => {
      if (commentBarrageConfig.dom && commentBarrageConfig.dom.contains(barrage)) {
        commentBarrageConfig.dom.removeChild(barrage)
      }
    }, 1000)
  }

  function destroyCommentBarrage() {
    if (commentBarrageConfig.intervalId) {
      clearInterval(commentBarrageConfig.intervalId)
      commentBarrageConfig.intervalId = null
    }
    commentBarrageConfig.barrageTimer = []
    commentBarrageConfig.barrageList = []
    commentBarrageConfig.barrageIndex = 0
    if (commentBarrageConfig.dom) {
      commentBarrageConfig.dom.innerHTML = ''
      if (commentBarrageConfig.dom.parentElement === document.body) {
        commentBarrageConfig.dom.remove()
      }
      commentBarrageConfig.dom = null
    }
  }

  function initCommentBarrage() {
    commentBarrageConfig.dom = document.querySelector('.comment-barrage')
    if (!commentBarrageConfig.dom) return

    resetCommentBarragePosition()

    const data = JSON.stringify({
      event: 'COMMENT_GET',
      'commentBarrageConfig.accessToken': commentBarrageConfig.accessToken,
      url: commentBarrageConfig.pageUrl
    })

    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        const parsed = JSON.parse(this.responseText)
        commentBarrageConfig.barrageList = commentLinkFilter(parsed.data || [])
        commentBarrageConfig.dom.innerHTML = ''
      }
    })
    xhr.open('POST', commentBarrageConfig.twikooUrl)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)

    if (commentBarrageConfig.intervalId) {
      clearInterval(commentBarrageConfig.intervalId)
    }

    commentBarrageConfig.intervalId = setInterval(() => {
      resetCommentBarragePosition()
      if (commentBarrageConfig.barrageList.length) {
        popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex])
        commentBarrageConfig.barrageIndex += 1
        commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length
      }

      const limit = commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage
        ? commentBarrageConfig.maxBarrage
        : commentBarrageConfig.barrageList.length

      if (commentBarrageConfig.barrageTimer.length > limit) {
        removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
      }
    }, commentBarrageConfig.barrageTime)
  }

  if (document.querySelector('#post-comment .comment-barrage')) {
    initCommentBarrage()
  }

  window.addEventListener('resize', resetCommentBarragePosition)
  window.addEventListener('scroll', resetCommentBarragePosition)
  document.addEventListener('pjax:send', () => {
    destroyCommentBarrage()
  })
  document.addEventListener('pjax:complete', () => {
    const hasCommentSection = !!document.querySelector('#post-comment .comment-barrage')
    if (hasCommentSection) {
      initCommentBarrage()
    } else {
      destroyCommentBarrage()
    }
  })
}
