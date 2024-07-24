import { navigate, StackScreen } from '@rise-tools/kit-react-navigation/server'
import { Button, SizableText, LucideIcon, toast, View, XStack, YStack, H1 } from '@rise-tools/kitchen-sink/server'
import { state, view, } from '@rise-tools/server'
import { response } from '@rise-tools/react'

const TheVibes = [
  { icon: '🚀', theme: 'red' },
  { icon: '🔥', theme: 'orange' },
  { icon: '🌊', theme: 'blue' },
  { icon: '😍', theme: 'yellow' },
  { icon: '🥳', theme: 'purple' },
  { icon: '👏', theme: 'green' },
] as const

type Vibe = typeof TheVibes[number]
type VibesState = Partial<Record<Vibe['icon'], number>>

const [vibeState, setVibesState] = state<VibesState>({})

export const models = {
  'home': SendVibes,
  'results': view(get => <VibeResults vibes={get(vibeState)} />),
}


function sendVibe(vibe: Vibe) {
  setVibesState(vibes => {
    return {
      ...vibes,
      [vibe.icon]: (vibes[vibe.icon] || 0) + 1
    }
  })
}

function VibeButton({ vibe }: { vibe: Vibe }) {
  return <Button theme={vibe.theme} size="$9" onPress={() => {
    sendVibe(vibe)
    return response(toast(`Thanks for the ${vibe.icon}`))
  }}>{vibe.icon}</Button>
}

export function SendVibes() {
  return (
    <YStack flex={1} justifyContent="center">
      <StackScreen title="Send Good Vibes" />
      <H1 margin="$4">What do you think about Rise Tools?</H1>
      <XStack flexWrap="wrap" gap="$4" padding="$4" justifyContent="center">
        {TheVibes.map(vibe => <VibeButton vibe={vibe} key={vibe.icon} />)}
      </XStack>
      <XStack padding="$4" justifyContent="center">
        <Button onPress={navigate('results', { headerBackTitle: 'Back' })} chromeless iconAfter={<LucideIcon icon='ChevronRight' />}>See Results</Button>
      </XStack>
    </YStack>
  )
}

export function VibeResults({ vibes }: { vibes?: VibesState }) {
  if (!vibes) return null
  const mostVibeCount = Math.max(0, ...Object.values(vibes))
  return (
    <YStack flex={1} justifyContent="center">
      <StackScreen title="What are the Vibes?" />
      <YStack>
        {TheVibes.map(vibe => {
          const vibeCount = vibes?.[vibe.icon] || 0

          return <XStack padding="$2" alignItems="center" justifyContent='space-between'>
            <View flex={vibeCount} margin="$2">
              <View padding="$2" backgroundColor={`$${vibe.theme}8`} borderRadius="$4">
                <SizableText size="$9">{vibe.icon}</SizableText>
              </View>
            </View>
            <View flex={mostVibeCount - vibeCount} />
            <SizableText size="$9" marginHorizontal="$2">{vibeCount}</SizableText>
          </XStack>
        })}
      </YStack>
    </YStack >
  )
}
