let DARK = 1
let ROOT_SCROLL = 1

let assign = Object.assign

const css = `
body {
    color:text;
    overflow:hidden scroll!important;
    touch-action:pan-x pan-y;
}
table {
  font-size:12px;
 width:98vw;
  margin:0px auto;
   
}
ul {
    list-style-type:none;
    padding:0px;
    margin:0px 14px;
}
li {
  line-height:1.5;
  
}

th, td {
    overflow-wrap: word-wrap;
    word-break:break-all;
    max-width: 20px;
    padding-left:8px !important;
    padding-right:8px !important;
}
th ~ th, td ~ td {
    overflow-wrap: word-wrap;
    word-break:break-all;
    max-width: 30px;
    display:none;
    padding-left:2px !important;
    padding-right:2px !important;
}
th ~ th ~ th, td ~ td ~ td {
    overflow-wrap: word-wrap;
    word-break:break-all;
    max-width: min(70vw,400px);
    display:inline-block;
    padding-left:4px !important;
    padding-right:4px !important;
}

pre,details {
  display:none;
}
`
setTimeout(() => {
    let dom = !!(typeof window != 'undefined' && window.document.documentElement != null)

    const styles = {
        scroll: {
            width: '100vw',
            minWidth: '100vw',
            maxWidth: '100vw',
            position: 'fixed',
            left: '0px',
            bottom: '0px',
            transform: `translate3d(0%, -25%,0%)`,
            //             minHeight: 'max(90vh,100%)',
            overflowY: 'visible',
            overflowX: 'hidden',
            height: '150vh',
            touchAction: 'none',
            margin: '0px',
            padding: '0px',
        },
        none: {},
        body: {
            background: 'rgba(30,10,10,.5)',
            color: 'text',
            touchAction: 'pan-y',
            //             display: 'contents',
            height: '90vh',
            margin: '0px',
            padding: '0px',
        },
    }

    function style(node, styles) {
        Object.assign(node.style, styles)
    }

    if (dom) {
        let win = window
        let doc = window.document
        let root = window.document.documentElement

        const meta = document.createElement('meta')
        const viewport = document.createElement('meta')
        meta.setAttribute('name', 'theme-color')
        meta.setAttribute('content', 'rgba(5,5,5,.5)')
        document.head.append(meta)

        viewport.setAttribute('name', 'viewport')
        viewport.setAttribute(
            'content',
            'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover',
        )
        document.head.append(viewport)
        document.head.append(meta)
        let sheet = document.createElement('style')
        sheet.id = 'style-sheet'
        sheet.textContent = css
        document.head.append(sheet)
        console.log('Inspector Running', {win, doc, root})
        root.style.setProperty('font', 'normal 100%/normal system-ui', 'important')
        root.style.setProperty('-webkit-text-size-adjust', '100%', 'important')
        root.style.setProperty('color-scheme', 'dark only', 'important')
        root.style.background = 'rgba(5,5,5,1)'
        root.style.setProperty('color', 'text', 'important')
        style(root, styles.scroll)
        document.scrollingElement.scrollTop = 0

        if (document?.body?.style?.setProperty) {
            style(document.body, styles.body)
        } else {
            let tid
            const handle = () => {
                if (document.body?.style?.setProperty) {
                    console.log('Body', document.body)
                    style(document.body, styles.body)
                } else {
                    clearTimeout(tid)
                    tid = setTimeout(handle, 10)
                }
            }

            handle()
        }
    } else {
        console.log('Inspector Not Run')
    }
}, 0)
