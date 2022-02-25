
function DisplayTags({tags}) {

  return (
    <>
      {tags.map((tag, index) => 
        <div key={index} className="mt-2 mb-3">
          <span className='tag'>{tag}</span>
        </div>
      )}
    </>
  )
}

export default DisplayTags