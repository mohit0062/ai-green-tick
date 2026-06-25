import Error from '@/components/shadcn-studio/blocks/error-page-04/error-page-04'



const ErrorPage04Block = () => {
  return <Error />
}

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <ErrorPage04Block />
    </div>
  )
}

export default LandingPage
