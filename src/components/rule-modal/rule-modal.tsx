import React from 'react';
import { BaseModal } from 'components/base-modal/base-modal';

export const RuleModal = ({ isActive, onClose, videoUrl }: IRuleModal): JSX.Element | null => {
    return isActive ? (
        <BaseModal id="rule-modal" closeCb={onClose} className="modal">
            <button
                onClick={onClose}
                type="button"
                style={{
                    background: 'none',
                    border: 'none',
                    padding: '1rem',
                    fontSize: '2rem',
                    position: 'absolute',
                    right: '1rem',
                    top: '1rem',
                }}
            >
                X
            </button>
            <video controls autoPlay loop>
                <source src={videoUrl} type="video/mp4" />
            </video>
        </BaseModal>
    ) : null;
};

interface IRuleModal {
    isActive: boolean;
    videoUrl: string;
    onClose: () => void;
}
