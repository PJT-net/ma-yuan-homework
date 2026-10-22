//DOM
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const progressBar = document.getElementById('progressBar');
//深色模式
if(localStorage.getItem('dark')==='1') html.classList.add('dark');
themeToggle.addEventListener('click',()=>{
    html.classList.toggle('dark');
    localStorage.setItem('dark',html.classList.contains('dark')?'1':'0');
})
//阅读进度条
window.addEventListener('scroll',()=>{
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = (scrollTop/docHeight)*100;
    progressBar.style.width = percent+'%';
})
//折叠面板
document.querySelectorAll('.collapse-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        const content = btn.nextElementSibling;
        content.classList.toggle('open');
        const icon = btn.querySelector('.arrow-icon');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    })
})
//拖拽交互
let dragTarget = null;
document.querySelectorAll('.drag-item').forEach(item=>{
    item.addEventListener('dragstart',(e)=>{
        dragTarget = e.target;
        e.dataTransfer.setData('text',e.target.dataset.key);
    })
})
document.querySelectorAll('.drop-area').forEach(area=>{
    area.addEventListener('dragover',e=>e.preventDefault());
    area.addEventListener('drop',(e)=>{
        e.preventDefault();
        const key = e.dataTransfer.getData('text');
        const aid = area.dataset.id;
        const tipDom = document.getElementById('dragTip');
        if(key === aid){
            area.innerText += " ✅"+dragTarget.innerText;
            dragTarget.style.visibility = "hidden";
            tipDom.innerText = "🎉匹配正确！";
            tipDom.style.color="#10b981";
        }else{
            tipDom.innerText = "❌匹配错误，请重新拖拽";
            tipDom.style.color="#ef4444";
        }
    })
})
//单选提交
document.getElementById('subQ1').addEventListener('click',()=>{
    const resDom = document.getElementById('resQ1');
    const sel = document.querySelector('input[name="q1"]:checked');
    if(!sel){
        resDom.innerText = "⚠️请先选择答案";
        resDom.style.color="#f59e0b";
        return;
    }
    if(sel.value === 'B'){
        resDom.innerText = "✅回答正确，根源是小农经济生产方式制约，唯物史观从物质层面找根本原因";
        resDom.style.color="#10b981";
    }else{
        resDom.innerText = "❌错误，正确答案B，A是英雄史观的错误看法，C只是外部因素";
        resDom.style.color="#ef4444";
    }
})
//多选提交
document.getElementById('subQ2').addEventListener('click',()=>{
    const resDom = document.getElementById('resQ2');
    const checks = document.querySelectorAll('input[name="q2"]:checked');
    const vals = Array.from(checks).map(c=>c.value);
    if(vals.includes('A') && vals.includes('B') && !vals.includes('C')){
        resDom.innerText = "✅回答正确，政权、思想属于上层建筑；锄头耕地属于生产力";
        resDom.style.color="#10b981";
    }else{
        resDom.innerText = "❌错误，上层建筑包含政权军队、意识形态；C属于生产力范畴";
        resDom.style.color="#ef4444";
    }
})
