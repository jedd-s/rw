export function getServerSideProps({ params }) {
  return { props: { params } }
}

export default function Page({ params }) {
  return (
    <span>
      {/* <h1 id='text' data-params={params.detail ?? ''}>
        /detail/{params.detail}
      </h1> */}
    </span>
  )
}
