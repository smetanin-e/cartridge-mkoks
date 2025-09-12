export const printBatch = () => {
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    console.error('Не удалось открыть окно печати');
    return;
  }

  const doc = printWindow.document;
  // Создаем корневые элементы

  const html = doc.createElement('html');

  const head = doc.createElement('head');
  const meta = doc.createElement('meta');
  meta.setAttribute('charset', 'UTF-8');
  const titleEl = doc.createElement('title');
  titleEl.innerText = `Ведомость отправки в сервис - партия 1`;

  // стили
  const style = doc.createElement('style');
  style.textContent = `
    body { font-family: Arial, sans-serif; margin: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .info { margin-bottom: 20px; }
    .info div { margin: 5px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .footer { margin-top: 30px; }
    .signature { margin-top: 50px; }
  `;

  head.appendChild(meta);
  head.appendChild(titleEl);

  const body = doc.createElement('body');
  body.innerHTML = htmlContent;

  html.appendChild(head);
  html.appendChild(body);

  // Полностью заменяем содержимое документа
  doc.replaceChildren(html);

  // Запускаем печать
  printWindow.focus();
  printWindow.print();
};

const htmlContent = `<div>123456789</div>`;
// const htmlContent = `<div class="header">
//               <h1>ВЕДОМОСТЬ ОТПРАВКИ КАРТРИДЖЕЙ В СЕРВИС</h1>
//               <h2>№ 1</h2>
//             </div>

//             <div class="info">
//               <div><strong>Дата:</strong>10.09.2025</div>
//               <div><strong>Ответственный:</strong>Иванов И.И.</div>
//               <div><strong>Количество картриджей:</strong> 25 шт.</div>

//             </div>

//             <table>
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   <th>Номер картриджа</th>
//                   <th>Модель</th>
//                 </tr>
//               </thead>
//               <tbody>

//                   <tr>
//                     <td>1</td>
//                     <td>МК105</td>
//                     <td>CE505</td>

//                   </tr>

//               </tbody>
//             </table>

//             <div class="signature">
//               <p>Ответственный за отправку: _________________ Иванов И.И.</p>
//               <p>Дата: 10.09.2025</p>
//             </div>`;
