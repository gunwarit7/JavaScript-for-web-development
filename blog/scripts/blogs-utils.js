const blogElement = document.getElementById('blog-container')
let blogsRawData = []
let loadingTimeOut = []

function createBlogHTML(blogs) {
    const blogsContentElement = blogs.map(function (blog) {
        return `
    <div class="flex flex-col md:flex-row gap-6 w-full">
    <img src="${blog.imageUrl}"
      alt="feature image 1" class="w-full md:w-auto" />
    <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
      <h3 class="text-2xl font-semibold">
        ${blog.title}
      </h3>
      <p class="text-xl font-light">
        ${blog.description}
      </p>
      <p>
      ${blog.publishedDate}
      </p>
      <a href="${blog.readMore}">Read more</a>
    </div>
    </div>`
    }).join('')

    blogElement.innerHTML = blogsContentElement
}

function searchBlogs(element) {
    clearTimeout(loadingTimeOut)

    blogElement.innerHTML = 'Loading...'
    loadingTimeOut = setTimeout(() => {
        const filteredBlogs = blogsRawData.filter(function (blog) {
            return blog.title.includes(element.value)
        })
        createBlogHTML(filteredBlogs)
    }, 2000)
}

function sortBlogs(element) {
    const sortBlogs = blogsRawData.sort(function (blogA, blogB) {
        let compareDate =
            new Date(blogA.publishedDate) - new Date(blogB.publishedDate)

        if (element.value === 'desc') {
            compareDate =
                new Date(blogB.publishedDate) - new Date(blogA.publishedDate)
        }
        return compareDate
    }
    )
    createBlogHTML(sortBlogs)
}

async function main() {
    const response = await axios.get('/scripts/blogs.json')
    blogsRawData = response.data

    createBlogHTML(blogsRawData)
}

main()