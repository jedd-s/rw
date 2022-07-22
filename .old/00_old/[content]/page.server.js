export function getServerSideProps({ params }) {
  return { props: { params } }
}

export default function Page({ params }) {
  return (
    <div>
      {/* <h1 id='text' data-params={params.content ?? ''}>
        /content/{params.content}
      </h1> */}
      <h3 id='text' data-params={''}>
        No Detail
      </h3>
    </div>
  )
}
