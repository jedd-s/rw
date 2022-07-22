import Detail from './Detail.client'

export async function getServerSideProps() {
  return {
    props: {
      data: {
        title: 'Detail Title',
      },
    },
  }
}

export default function Root({ children, custom, data }) {
  return (
    <>
      <Detail />
      {children}
    </>
  )
}
