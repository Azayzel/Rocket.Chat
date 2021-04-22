import { Box, Icon } from '@rocket.chat/fuselage';
import React, { FC, memo, ReactElement } from 'react';

import { IMessage } from '../../../../definition/IMessage';
import Edited from './Edited';
import Pinned from './Pinned';
import SentByMail from './SentByMail';
import Starred from './Starred';
import Translated from './Translated';

type StatusIconType = FC<{
	type: string;
	msg: IMessage;
}>;

const renderStatus = (type: string, msg: IMessage): ReactElement | undefined => {
	switch (type) {
		case 'edited':
			return <Edited msg={msg} />;
		case 'e2e':
			return <Icon name='key' />;
		case 'otr-ack':
			return <Icon name='shredder' />;
		case 'translated':
			return <Translated msg={msg} />;
		case 'pinned':
			return <Pinned />;
		case 'starred':
			return <Starred />;
		case 'sent-by-email':
			return <SentByMail />;
	}
};

const StatusIcon: StatusIconType = ({ type, msg }) => (
	<Box is='span' mis='x3'>
		{renderStatus(type, msg)}
	</Box>
);

export default memo(StatusIcon);