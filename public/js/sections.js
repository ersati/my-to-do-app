const sections = document.querySelectorAll('section');
const sectionList = document.querySelector('section.category-list')
const sectionMain = document.querySelector('section.all')

if(sections.length){

    function updateClasses() {
        const allClasses = JSON.parse(localStorage.getItem('sectionClasses'));
        if(allClasses){
            sectionMain.setAttribute('class', allClasses[0].classes);
            sectionList.setAttribute('class', allClasses[1].classes);
        }}

    updateClasses()

    function checkClasses () {
            let sectionsHasAClass = [...sections].map(section => { return {classes: section.getAttribute('class')}})
            localStorage.setItem('sectionClasses', JSON.stringify(sectionsHasAClass));
            return sectionsHasAClass}

    checkClasses()
        
    sectionList.addEventListener('click', (e)=>{
        if(e.target.classList.contains('headline')){
            sectionList.classList.toggle('active-list');
            sectionMain.classList.toggle('active-task');
        checkClasses()
        }
        })
}

