const Dropdown__fromItems = document.querySelectorAll('#chooseList li');
Dropdown__fromItems.forEach((item, index) => {item.addEventListener('click', () => {showContent(item.getAttribute('data-content'))})})
showContent('basic__calculator', 1);
function showContent(contentId) {
    const contentItems = document.querySelectorAll('.calc')
    contentItems.forEach(item => {
        item.classList.remove('active')
        item.style.display = 'none'
      });
    const selectedContent = document.querySelector(`#${contentId}`)
    selectedContent.style.display = 'flex'
    selectedContent.classList.add('active')
}  