import Content from './Content.client'

export async function getServerSideProps() {
  return {
    props: {
      data: {
        title: 'Content Title',
      },
    },
  }
}

import React from 'react'

export default function Root({ children, custom, data }) {
  return (
    <>
      <Content>{children}</Content>

      {/* <span id='detailroouit'>{children}</span> */}
    </>
  )
}
