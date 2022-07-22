import React from 'react'

const View = React.forwardRef((props, ref) => {
  const style = Object.assign(
    {
      // padding: 0,
      // backgroundColor: `rgba(0,0,0,0)`,
      // backgroundColor: `rgba(20,20,22,8)`,
    },
    props.style || {}
  )

  return React.createElement(
    'div',
    Object.assign({ ref, 'data-layout': 'vstack' }, props, { style })
  )
})

function TestClient(props) {
  return (
    <View
      style={{
        minHeight: '1000px',
        alignItems: 'center',
        padding: '44px 20px',
        width: 'min(100%,100vw)',
      }}
    >
      <div
        data-layout='readable'
        style={
          {
            // transform: `translate3d(0px,0px,1px)`,
            // isolation: 'isolate',
            // willChange: 'transform',
            // display: 'block',
            // padding: '0px 0px',
            // maxWidth: 'clamp(100%,100vw,600px)',
            // display: 'contents',
          }
        }
        // data-layout='vgrid'
      >
        <p>
          When it comes to performance, JavaScript generally gets the headlines.
          But if you look carefully, web pages are not all JavaScript, the
          performance of all the other parts also has a dramatic impact on the
          user experience. Observing only JavaScript gives a single point of
          view over the complex mosaic that is web performance.
        </p>
        <p>
          Making CSS faster and more scalable is an area of research in the
          WebKit project. The DOM and CSS do not always scale very well and it
          is sadly still common to see missed frames during complex animations.
        </p>
        <p>
          A technique we use to speed things up in JavaScript is eliminating
          slow paths with Just In Time Compilers (JIT). CSS is a great candidate
          for JIT compilation, and since the end of last year, WebKit compiles
          certain CSS Selectors on the fly.
        </p>
        <p>
          This blog post introduces the CSS Selector JIT, its pros and cons, and
          how you can help us make CSS better.
        </p>
        <h2>How and Why Compile CSS?</h2>
        <p>
          CSS is the language telling the engine how to present the DOM tree on
          screen. Every web engine uses a complex machinery that goes over
          everything in the DOM and applies the rules defined by CSS.
        </p>
        <p>
          There is no direct link between the DOM tree and the style rules. For
          each element, the engine needs to collect a list of rules that apply
          to it. The way CSS and the DOM tree are connected is through the CSS
          selectors.
        </p>
        <p>
          Each selector describes in a compact format what properties are
          required for an element to get a particular style. The engine has to
          figure out which elements have the required properties, and this is
          done by testing the selectors on the elements. As you can imagine,
          this is a complicated task for anything but the most trivial DOM tree
          (fortunately WebKit has many optimizations in this area ).
        </p>
        <p>
          So how did we make this faster? A simple solution we picked is to make
          testing a selector on an element very fast.
        </p>
        <p>
          The way selector matching used to work is through a software machine,
          the <em>SelectorChecker</em> instance, taking two inputs: a selector
          and an input element. Given the inputs, a <em>SelectorChecker</em>{' '}
          goes over each part of the selector, and tries to find the required
          properties in the tree ending with the input element.
        </p>
        <p>
          The following illustrates a simplified version of how selector testing
          used to work:
        </p>

        <p>
          The problem with <em>SelectorChecker</em> is that it needs to be
          completely generic. We had a complicated selector interpreter, capable
          of handling any combination of difficult cases for any selector.
          Unfortunately, big generic machines are not exactly fast.
        </p>
        <p>
          When using the CSS JIT, the task of matching a selector is split in
          two: first compiling, then testing. A JIT compiler takes the selector,
          does all the complicated computations when compiling, and generates a
          tiny binary blob corresponding to the input selector: a compiled
          selector. When it is time to find if an element that matches the
          selector, WebKit can just invoke the compiled selector.
        </p>
        <p>
          The following animation illustrates the same process as above, but
          using the CSS Selector JIT:
        </p>

        <p>
          Obviously, all the complexity related to CSS Selectors is still there.
          The Selector JIT Compiler is a big generic machine, just like{' '}
          <em>SelectorChecker</em> was. What changed is that most of that
          complexity has been moved to compilation time, and it only happens
          once. The binary generated at runtime is only as complex as the input
          selector.
        </p>
        <h2>There is Beauty in Simplicity</h2>
        <p>
          Although one might think that employing a JIT always makes execution
          faster, it is a fallacy. The truth is adding a compiler starts by
          making everything slower, and the compiler makes up for it by creating
          very fast machine code. The overall process is only a gain when the
          combined execution time of the compiler and compiled code is smaller
          than the execution time of the compiler.
        </p>
        <p>
          When the workload is small, the time taken by the compiler is bigger
          than the gain. For example, let’s say we have a JIT compiler that is 4
          times slower than <em>SelectorChecker</em>, but the compiled code is 4
          times as fast as <em>SelectorChecker</em>. Here is the time diagram of
          one execution:
        </p>
        <p>
          <img
            srcSet='/images/SiriOrbDark.png 1x'
            width='1024'
            height='1024'
            decoding='async'
            style={{
              maxWidth: '100%',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </p>
        <p>
          With this kind of timing, we can run 5 full queries on the old C++
          selector checker and still be faster than the JIT.
        </p>
        <p>
          <img
            srcSet='/images/monteray-dark.jpg 1x'
            width='6016'
            height='6016'
            decoding='async'
            style={{
              maxWidth: '100%',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </p>
        <p>
          When the JIT compiler is fast enough and the workload is large enough,
          the compiled version wins:
        </p>

        <p>
          This constraint is also a reason why benchmarks running for a long
          time can be misleading, they can hide slow compilers. JIT compilers
          can help to have a great throughput for long running programs, but no
          real web page behaves that way. The latency introduced by compilation
          also has the potential to become a disaster for animations.
        </p>
        <p>
          Does this mean we shot ourselves in the foot by making something that
          is only fast in benchmarks? Not really, we fixed that problem too.
        </p>
        <p>
          There are several ways to mitigate the latency introduced by a JIT
          compiler. JavaScriptCore uses multiple advanced subsystems to reach
          that goal. So far, the Selector JIT can get away with a simple
          solution: make the compiler extremely fast.
        </p>
        <p>There are two key parts to the speed of this compiler.</p>
        <ol>
          <li>
            First, the compiler is very simple. Making optimizations can take a
            lot of time, so we decided to optimize very little. The generated
            binary is not perfect but it is fast to produce.
          </li>
          <li>
            The second trick is to use very fast binary generation. To do that,
            the compiler is built on top of JavaScriptCore’s infrastructure.
            JavaScriptCore has tools to generate binaries extremely quickly, and
            we use that directly in WebCore.
          </li>
        </ol>

        <p>
          In the most recent versions of the JIT, the compilation phase is
          within one order of magnitude of a single execution of{' '}
          <em>SelectorChecker</em>. Given that even small pages have dozen of
          selectors and hundreds of elements, it becomes easy to reclaim the
          time taken by the compiler.
        </p>
        <h2>How Fast Is It?</h2>
        <p>
          To give an idea of order of magnitude, I have prepared a{' '}
          <a href='https://webkit.org/blog-files/css-jit-introduction/html5-single-page-microbenchmark.html'>
            little microbenchmark for this blog
          </a>
          . It tests various use cases, including things that used to be slow on
          WebKit.
        </p>
        <p>
          On my Retina Macbook Pro, the benchmark runs in about 1100
          milliseconds on a WebKit from December, and in less than 500
          milliseconds on today’s WebKit nightly. A gain of 2x is generally what
          we expect on common selectors.
        </p>
        <p>
          Obviously, the speed gains depends greatly on the page. Gains are
          sometimes much larger if the old WebKit was hitting one of the slow
          paths, or could be smaller for selectors that are either trivial or
          not compiled. I expect a lot to change in the future and I hope we
          will get even more feedback to help shaping the future of CSS
          performance.
        </p>
        <h2>What About querySelector?</h2>
        <p>
          The functions <code>querySelector()</code> and{' '}
          <code>querySelectorAll()</code> currently share a large part of
          infrastructure with style resolution. In many cases, both functions
          will also enjoy the CSS JIT Compiler.
        </p>
        <p>
          Typically, the querySelector API is used quite differently from style
          resolution. As a result, we optimize it separately so that each
          subsystem can be the fastest for its specific use cases. A side effect
          of this is that querySelector does not always give a good picture of
          selector performance for style resolution, and vice versa.
        </p>
        <h2>How Can You Help?</h2>
        <p>
          There is ongoing work to support everything <em>SelectorChecker</em>{' '}
          can handle. Currently, some pseudo types are not supported by the JIT
          compiler and WebKit fall backs to the old code. The missing pieces are
          being added little by little.
        </p>
        <p>
          There are many opportunities to help making CSS faster. The existing
          benchmarks for CSS are extremely limited, there is nothing like
          JSBench for CSS. As a result, the input we get from performance
          problems on real websites is immensely valuable.
        </p>
        <p>
          If you are a web developer, or a WebKit enthusiast, try your favorite
          website with <a href='https://webkit.org/nightly'>WebKit Nigthly</a>.
          If you run into performance problems with CSS, please file a{' '}
          <a href='https://bugs.webkit.org/enter_bug.cgi?product=WebKit'>
            bug on WebKit’s bug tracker
          </a>
          . So far, every single bug that has been filed about the CSS JIT has
          be hugely useful.
        </p>
        <p>
          Finally, if you are interested in the implementation details,
          everything is open source and available on webkit.org. You are welcome
          to help make the web better.
        </p>
        <p>
          You can send me questions to{' '}
          <a href='https://twitter.com/awfulben'>@awfulben</a> on twitter. For
          more in-depth discussions, you can write an email on{' '}
          <a href='https://lists.webkit.org/mailman/listinfo/webkit-help'>
            webkit-help
          </a>{' '}
          (or <a href='/reporting-bugs/'>file a bug report</a>).
        </p>
      </div>
    </View>
  )
}

export default TestClient
