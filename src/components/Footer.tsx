import { Container } from '@/components/ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 PolicyGen. All rights reserved.</p>
            <p className="mt-2">
              Generated policies are templates only. Consult with legal professionals for compliance.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}