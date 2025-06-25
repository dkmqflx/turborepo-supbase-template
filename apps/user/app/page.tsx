import { Button } from '@repo/ui/button';

export default function Home() {
  return (
    <div className="space-y-4 p-4">
      <div className="space-x-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="destructive">Destructive Button</Button>
      </div>

      <div className="space-x-4 rounded-lg bg-slate-950 p-8">
        <div className="dark space-x-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive Button</Button>
        </div>
      </div>
    </div>
  );
}
