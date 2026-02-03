import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'links.json');

// Helper to read data
const readData = () => {
    try {
        if (!fs.existsSync(dataFilePath)) {
            return [];
        }
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading links data:', error);
        return [];
    }
};

// Helper to write data
const writeData = (data: any[]) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing links data:', error);
        return false;
    }
};

export async function GET() {
    const links = readData();
    // Sort by order 
    links.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    return NextResponse.json(links);
}

export async function POST(request: Request) {
    try {
        // Basic protection: check for admin session cookie is ideal, 
        // but for now we rely on the fact that the Admin UI calls this.
        // In a strictly secure app, we'd verify the session here.
        // Assuming this is called from the admin page which is protected.

        const body = await request.json();

        // Validation could go here

        if (writeData(body)) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to write data' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
}
