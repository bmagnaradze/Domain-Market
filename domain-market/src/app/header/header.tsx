import '../header/header.style.scss';
import Image from 'next/image';
export default function Header() {
  return (
    <div className='Header'>
      <div className='Logo'>
        <Image src='../images/logo.svg' alt='logo' width={200} height={32} />
      </div>
      <div className='ProfileSec'>
        <div className='Box'>
          <Image
            src='../images/notify-icon.svg'
            alt='logo'
            width={20}
            height={20}
          />
        </div>
        <div className='Box'>
          <Image
            src='../images/cart-icon.svg'
            alt='logo'
            width={20}
            height={20}
          />
        </div>
        <div className='Box'>
          <Image
            src='../images/profile-icon.svg'
            alt='logo'
            width={20}
            height={20}
          />
          Kancha Co.
          <Image
            src='../images/arrow-down.svg'
            alt='logo'
            width={8}
            height={5}
          />
        </div>
        <div className='Box'>
          <Image
            src='../images/flag-icon.svg'
            alt='logo'
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
}
