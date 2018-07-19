import React from 'react';

export default ({ toggle }) => {
    return <div>
        <div className="cancel-overlay" onClick={toggle}></div>
        <div className="widget cancel-appointment-div cancel-popup">
            <div className="widget-header text-center action-screen-header">
                <p className="fw-500 cancel-appointment-head">Cancellation Policy</p>
                <img src="/assets/img/icons/close.png" className= "close-modal" onClick={toggle}/>
                <hr />
            </div>
            <div className="cancel-policy-text">
                <p className="fw-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has more-or-less normal distribution.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec consectetur dolor eget quam eleifend volutpat.Pellentesque consectetur metus id dolor mattis, mollis gravida tellus aliquet.Donec feugiat lectus eget efficitur porta.Nulla placerat nisl nec eros dictum, vel euismod justo euismod.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable... .Pellentesque consectetur metus id dolor mattis, mollis gravida tellus aliquet.Donec feugiat lectus eget efficitur porta.Nulla placerat nisl nec eros dictum, vel euismod justo euismod It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has more-or-less normal distribution.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec consectetur dolor eget quam eleifend volutpat.Pellentesque consectetur metus id dolor mattis, mollis gravida tellus aliquet.Donec feugiat lectus eget efficitur porta.Nulla placerat nisl nec eros dictum, vel euismod justo euismod.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable... .Pellentesque consectetur metus id dolor mattis, mollis gravida tellus aliquet.Donec feugiat lectus eget efficitur porta.Nulla placerat nisl nec eros dictum, vel euismod justo euismod</p>
            </div>
        </div>
    </div>
}