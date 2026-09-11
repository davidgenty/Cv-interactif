const sceneTabs=[...document.querySelectorAll('.scene-tabs .tab-link')];
const scenes=[...document.querySelectorAll('.scene-content')];

function showScene(tab){
  const sceneId=tab.dataset.scene;
  sceneTabs.forEach(item=>{
    const selected=item===tab;
    item.classList.toggle('active',selected);
    item.setAttribute('aria-selected',String(selected));
    item.setAttribute('tabindex',selected?'0':'-1');
  });
  scenes.forEach(scene=>scene.classList.toggle('active',scene.id===sceneId));
}

sceneTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>showScene(tab));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    let next=index;
    if(event.key==='ArrowRight')next=(index+1)%sceneTabs.length;
    if(event.key==='ArrowLeft')next=(index-1+sceneTabs.length)%sceneTabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=sceneTabs.length-1;
    sceneTabs[next].focus();
    showScene(sceneTabs[next]);
  });
});

scenes.forEach(scene=>{
  scene.querySelectorAll('p').forEach(paragraph=>{
    const text=paragraph.textContent.trim();
    if(text.startsWith('«'))paragraph.classList.add('course-quote');
    if(text.startsWith('En Audiard'))paragraph.classList.add('audiard-quote');
  });
});
