import { Controller,Get } from '@nestjs/common';

@Controller('website')
export class WebsiteController {

    @Get()
    getHello(): string {
      return 'website page';
    }
}
