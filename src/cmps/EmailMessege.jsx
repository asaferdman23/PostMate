// function EmailMessage({ message }) {
//   return (
//     <tr className={[email.isRead ? '' : 'bold ', isSelectet ? 'selected' : '']}
//             onClick={(ev) => onHandleOpenMailDetails(ev, email)}
//             onMouseEnter={handleHoveToggle}
//             onMouseLeave={handleHoveToggle}
//         >
//             <td><input type="checkbox" onClick={(ev) => onToggleSelectEmail(ev, email)} /></td>
//             <td onClick={handleStarChange}>
//                 <Icon iconData={{ src: starImg, style: 'remove-padding' }} /> </td>
//             <td>{email.subject} </td>
//             <td><div className='text-preview'>{email.body}</div> </td>
//             <td>
//                 {!isHovered ? <div>{formattedDate}</div> : <PrevMailActionBtn path={path} />}
//             </td>
//         </tr>
//   );
// }

// export default EmailMessage;