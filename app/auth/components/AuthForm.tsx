'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

type AuthFormProps = {
  title: string;
  description: string;
  fields: FormField[];
  submitLabel: string;
  footerText: string;
  footerLink: {
    text: string;
    href: string;
  };
  onSubmit: (e: React.FormEvent) => void;
};

export default function AuthForm({
  title,
  description,
  fields,
  submitLabel,
  footerText,
  footerLink,
  onSubmit,
}: AuthFormProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            {submitLabel}
          </Button>
          <div className="text-center text-sm">
            {footerText}{' '}
            <Link href={footerLink.href} className="underline underline-offset-4 hover:text-primary">
              {footerLink.text}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}