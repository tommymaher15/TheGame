import { MetaTag, Text, VStack, Wrap, WrapItem } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React, { useMemo } from 'react';

type Props = {
  player: PlayerFragmentFragment;
};

const SHOW_MEMBERSHIPS = 4;

export const PlayerTileMemberships: React.FC<Props> = ({ player }) => {
  const show = useMemo(
    () =>
      player.daohausMemberships.reduce(
        (t, { moloch: { title } }) => t || !!title,
        false,
      ),
    [player.daohausMemberships],
  );
  return show ? (
    <VStack spacing={2} align="stretch">
      <Text textStyle="caption">MEMBER OF</Text>
      <Wrap>
        {player.daohausMemberships
          .filter((m) => m.moloch.title !== null)
          .slice(0, SHOW_MEMBERSHIPS)
          .map((member) => (
            <WrapItem key={member.id}>
              <MetaTag size="md" fontWeight="normal">
                {member.moloch.title}
              </MetaTag>
            </WrapItem>
          ))}
        {player.daohausMemberships.length > SHOW_MEMBERSHIPS && (
          <WrapItem>
            <MetaTag size="md" fontWeight="normal">
              {`+${player.daohausMemberships.length - SHOW_MEMBERSHIPS}`}
            </MetaTag>
          </WrapItem>
        )}
      </Wrap>
    </VStack>
  ) : null;
};
