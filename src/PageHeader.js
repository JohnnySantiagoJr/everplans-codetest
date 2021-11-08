export default function PageHeader({title, link}) {
  return (
    <>
      <h1>{title}</h1>
      <a href="/">{link}</a>
    </>
  )
}