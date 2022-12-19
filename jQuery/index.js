$("a").click(()=> {
    alert("Hi")
})

$("a").attr("href", "")


$("body").keypress((event)=>{
    $("h1").text(event.key)
})

$("h1").on("mouseover", () => {
    $("h1").css("color", "purple")
})

// before
// after
// prepend (inside the element tag but before the constent)
// append (opposite of prepend)
$("h1").append("<button>Hi Moutasim</button>")