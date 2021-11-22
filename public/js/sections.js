const sections = document.querySelectorAll('section');
const sectionList = document.querySelector('section.category-list')
const sectionMain = document.querySelector('section.all')

if(sections.length){
    function updateClasses() {
        const allClasses = JSON.parse(localStorage.getItem('sectionClasses'));
        sectionList.setAttribute('class', allClasses[0].classes);
        sectionMain.setAttribute('class', allClasses[1].classes)
        console.log(allClasses[0].classes, allClasses[1].classes)
        }
        updateClasses()
        function checkClasses () {
            let sectionsHasAClass = [...sections].map(section => { return {classes: section.getAttribute('class')}})
            localStorage.setItem('sectionClasses', JSON.stringify(sectionsHasAClass));
            console.log(sectionsHasAClass)
            return sectionsHasAClass
        }
        checkClasses()
        
        console.log('im here')
        
        sectionList.addEventListener('click', (e)=>{
        if(e.target.classList.contains('headline')){
        sectionList.classList.toggle('active-list');
        sectionMain.classList.toggle('active-task');
        checkClasses()
        console.log(checkClasses())
        }
        
        })
}

